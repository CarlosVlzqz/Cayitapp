import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

export interface ExternalProductData {
  name: string;
  brand?: string;
  category?: string;
  imageUrl?: string;
}

@Injectable()
export class BarcodeLookupService {
  private readonly logger = new Logger(BarcodeLookupService.name);

  /**
   * Fetches cosmetics data from OpenBeautyFacts (Free, no API key).
   * Perfect for makeup, skincare, and perfumes.
   */
  async lookupOpenBeautyFacts(barcode: string): Promise<ExternalProductData | null> {
    try {
      const url = `https://world.openbeautyfacts.org/api/v0/product/${barcode}.json`;
      const response = await axios.get(url);

      if (response.data.status === 1) {
        const p = response.data.product;
        return {
          name: p.product_name || p.generic_name || 'Unknown Beauty Product',
          brand: p.brands,
          category: p.categories?.split(',')[0],
          imageUrl: p.image_url,
        };
      }
      return null;
    } catch (error) {
      this.logger.error(`Error fetching from OpenBeautyFacts: ${error.message}`);
      return null;
    }
  }

  /**
   * Fetches general retail data from UPCItemDB.
   * Best for clothing, accessories, and electronics.
   * Free tier: 100 lookups/day.
   */
  async lookupUPCItemDB(barcode: string): Promise<ExternalProductData | null> {
    try {
      const url = `https://api.upcitemdb.com/prod/trial/lookup?upc=${barcode}`;
      const response = await axios.get(url);

      if (response.data.total > 0) {
        const item = response.data.items[0];
        return {
          name: item.title,
          brand: item.brand,
          category: item.category?.split(' > ').pop(), // Get the most specific category
          imageUrl: item.images?.[0],
        };
      }
      return null;
    } catch (error) {
      this.logger.error(`Error fetching from UPCItemDB: ${error.message}`);
      return null;
    }
  }

  /**
   * Main entry point for lifestyle barcode lookup.
   */
  async findProduct(barcode: string): Promise<ExternalProductData | null> {
    this.logger.log(`Looking up lifestyle barcode: ${barcode}`);
    
    // 1. Try Beauty/Cosmetics first
    const beautyData = await this.lookupOpenBeautyFacts(barcode);
    if (beautyData) return beautyData;

    // 2. Try General Retail (Clothing/Accessories)
    const retailData = await this.lookupUPCItemDB(barcode);
    if (retailData) return retailData;

    // 3. Fallback to Food (if they scan a snack/drink)
    return this.lookupOpenFoodFacts(barcode);
  }

  /**
   * Fetches product data from OpenFoodFacts (free, no API key required).
   * Good for food/grocery items.
   */
  async lookupOpenFoodFacts(
    barcode: string
  ): Promise<ExternalProductData | null> {
    try {
      const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
      const response = await axios.get(url);

      if (response.data.status === 1) {
        const p = response.data.product;
        return {
          name: p.product_name || p.generic_name || 'Unknown Product',
          brand: p.brands,
          category: p.categories?.split(',')[0],
          imageUrl: p.image_url,
        };
      }
      return null;
    } catch (error) {
      this.logger.error(`Error fetching from OpenFoodFacts: ${error.message}`);
      return null;
    }
  }
}
