import type { TestItem } from '../types';
import { INITIAL_TESTS } from '../data/initialTests';

const STORAGE_KEY = 'almansa_ensayos_obra_v1';
const AUTH_KEY = 'almansa_auth_mode_v1';

export function loadTestsFromStorage(): TestItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return INITIAL_TESTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.error('Error loading tests from localStorage:', err);
  }
  return INITIAL_TESTS;
}

export function saveTestsToStorage(tests: TestItem[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tests));
    return true;
  } catch (err) {
    console.error('Error saving tests to localStorage:', err);
    // If quota exceeded, we could alert or strip old raw images
    return false;
  }
}

export function resetTestsToDefaults(): TestItem[] {
  localStorage.removeItem(STORAGE_KEY);
  return INITIAL_TESTS;
}

export function loadAuthMode(): boolean {
  try {
    return localStorage.getItem(AUTH_KEY) === 'true';
  } catch {
    return false;
  }
}

export function saveAuthMode(isEditMode: boolean): void {
  try {
    localStorage.setItem(AUTH_KEY, isEditMode ? 'true' : 'false');
  } catch (err) {
    console.error('Error saving auth mode:', err);
  }
}

/**
 * Resizes and compresses an image file to Base64 JPEG
 * to ensure it fits well in localStorage without degrading visual quality.
 */
export async function compressImage(file: File, maxWidth = 1200, quality = 0.78): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(img.src);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
}
