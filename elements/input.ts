import { BaseElement } from "./base_element";
import { allure } from "allure-playwright";

export class Input extends BaseElement {
  get typeOf(): string {
    return 'input';
  }
  /**
  * Вставка данных в элементы инпутов и textarea
  */
  async dataInput( inputData: string):Promise<void>{
    await allure.step(`Input data: ${this.WebElement} in element: ${this.WebElement}. Web element: ${this.NameElement}`, async()=>{
      await this.WebElement.fill(inputData)
    })
  }
}