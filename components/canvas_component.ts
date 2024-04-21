import { Locator, Page } from "@playwright/test";

export class CanvasComponent {
  canvasEmptyDiv: Locator;
  canvasDiv: Locator;
  constructor(protected page: Page){
    this.canvasEmptyDiv = page.locator('[data-cy="empty-canvas"]')
    this.canvasDiv = page.locator('[data-cy="canvas"]')
  }
  

}