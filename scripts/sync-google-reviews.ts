import fs from 'fs';
import path from 'path';

interface GoogleReviewItem {
  authorName: string;
  rating: number;
  relativeTime: string;
  text: string;
  profilePhotoUrl?: string;
}

interface GoogleReviewsData {
  rating: number;
  userRatingsTotal: number;
  placeUrl: string;
  cid: string;
  lastSyncedAt: string;
  reviews: GoogleReviewItem[];
}

// Simple .env reader if running locally
function loadLocalEnv() {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const value = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    }
  }
}

async function syncGoogleReviews() {
  loadLocalEnv();

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const cid = process.env.GOOGLE_CID || '9827350998413973025';
  const placeId = process.env.GOOGLE_PLACE_ID;
  const placeUrl = 'https://maps.app.goo.gl/LA6mRurL1Dnmb4Vn8';

  const dataFilePath = path.resolve(process.cwd(), 'src/data/googleReviews.json');
  const indexHtmlPath = path.resolve(process.cwd(), 'index.html');

  if (!fs.existsSync(dataFilePath)) {
    console.error(`❌ Fichier introuvable : ${dataFilePath}`);
    process.exit(1);
  }

  const currentData: GoogleReviewsData = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

  if (!apiKey) {
    console.log('ℹ️ [Google Reviews Sync] Clé GOOGLE_PLACES_API_KEY non configurée.');
    console.log(`ℹ️ [Google Reviews Sync] Conservation des valeurs actuelles : Note ${currentData.rating}/5 (${currentData.userRatingsTotal} avis).`);
    console.log('💡 Ajoutez la variable secrète GOOGLE_PLACES_API_KEY dans vos secrets GitHub pour activer la synchronisation automatique.');
    return;
  }

  console.log('🔄 [Google Reviews Sync] Interrogation de Google Places API...');

  try {
    let endpoint = `https://maps.googleapis.com/maps/api/place/details/json?cid=${cid}&fields=name,rating,user_ratings_total,reviews&language=fr&key=${apiKey}`;
    if (placeId) {
      endpoint = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&language=fr&key=${apiKey}`;
    }

    const response = await fetch(endpoint);
    const json = await response.json();

    if (json.status !== 'OK' || !json.result) {
      console.warn(`⚠️ [Google Reviews Sync] Statut Google API inattendu : ${json.status}. Message : ${json.error_message || 'N/A'}`);
      console.log('ℹ️ Conservation des valeurs actuelles du fichier JSON.');
      return;
    }

    const result = json.result;
    const newRating = Number(result.rating || currentData.rating);
    const newCount = Number(result.user_ratings_total || currentData.userRatingsTotal);

    const formattedReviews: GoogleReviewItem[] = Array.isArray(result.reviews)
      ? result.reviews.map((r: any) => ({
          authorName: r.author_name || 'Cliente KRbeauté',
          rating: Number(r.rating) || 5,
          relativeTime: r.relative_time_description || '',
          text: r.text || '',
          profilePhotoUrl: r.profile_photo_url || undefined,
        }))
      : currentData.reviews || [];

    const updatedData: GoogleReviewsData = {
      rating: newRating,
      userRatingsTotal: newCount,
      placeUrl: currentData.placeUrl || placeUrl,
      cid,
      lastSyncedAt: new Date().toISOString(),
      reviews: formattedReviews,
    };

    const hasChanged =
      currentData.rating !== newRating ||
      currentData.userRatingsTotal !== newCount ||
      JSON.stringify(currentData.reviews) !== JSON.stringify(formattedReviews);

    if (hasChanged) {
      fs.writeFileSync(dataFilePath, JSON.stringify(updatedData, null, 2) + '\n', 'utf-8');
      console.log(`✅ [Google Reviews Sync] Données mises à jour avec succès : Note ${newRating}/5 (${newCount} avis réels).`);

      // Mettre à jour Schema.org dans index.html si nécessaire
      if (fs.existsSync(indexHtmlPath)) {
        let htmlContent = fs.readFileSync(indexHtmlPath, 'utf-8');
        const oldRatingRegex = /"ratingValue":\s*"[0-9.]+"/g;
        const oldCountRegex = /"reviewCount":\s*"[0-9]+"/g;

        let htmlChanged = false;
        if (oldRatingRegex.test(htmlContent)) {
          htmlContent = htmlContent.replace(oldRatingRegex, `"ratingValue": "${newRating.toFixed(1)}"`);
          htmlChanged = true;
        }
        if (oldCountRegex.test(htmlContent)) {
          htmlContent = htmlContent.replace(oldCountRegex, `"reviewCount": "${newCount}"`);
          htmlChanged = true;
        }

        if (htmlChanged) {
          fs.writeFileSync(indexHtmlPath, htmlContent, 'utf-8');
          console.log(`✅ [Google Reviews Sync] Schema.org (JSON-LD) mis à jour dans index.html.`);
        }
      }
    } else {
      console.log(`✨ [Google Reviews Sync] Aucun changement détecté. Note : ${newRating}/5 (${newCount} avis).`);
    }
  } catch (error) {
    console.error('❌ [Google Reviews Sync] Erreur lors de la synchronisation :', error);
  }
}

syncGoogleReviews();
