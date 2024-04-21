import { Input } from "../elements/input"
import { Page, Locator } from "@playwright/test";
import { BlockLowercaseElements } from "../elements/block_lowercase_element";
import { Button } from "../elements/button";
import { expect } from "@playwright/test";
export interface IButtons {
  [key:string]:Button
}
export interface IMovableElements {
  'displayBoxDiv'?: BlockLowercaseElements,
  'operationBoxDiv'?:BlockLowercaseElements,
  'buttonsBoxDiv'?:BlockLowercaseElements,
  'submitBoxDiv'?:BlockLowercaseElements
}
export type MovableElementsType = 'displayBoxDiv'|'operationBoxDiv'|'buttonsBoxDiv'|'submitBoxDiv';
export class Calculator{
  lockedContainerInSidebar:BlockLowercaseElements;
  constructorButton: Button;
  runtimeButton: Button;
  displayInput:BlockLowercaseElements;
  displayBoxDiv: BlockLowercaseElements;
  canvasEmptyDiv: BlockLowercaseElements;
  canvasDiv: BlockLowercaseElements;
  operationBoxDiv: BlockLowercaseElements;
  buttonsBoxDiv:BlockLowercaseElements;
  submitBoxDiv:BlockLowercaseElements;
  sidebar: BlockLowercaseElements;
  constructor(public page:Page){
    this.displayInput = new BlockLowercaseElements(page, '[data-cy="display"]', 'displayInput')
    this.displayBoxDiv = new BlockLowercaseElements(page, '[data-cy="display-box"]', 'displayDragDiv');
    this.operationBoxDiv = new BlockLowercaseElements(page, '[data-cy="operations-box"]', 'operationBox')
    this.canvasEmptyDiv = new BlockLowercaseElements(page, '[data-cy="empty-canvas"]', 'canvasEmptyDiv')
    this.canvasDiv = new BlockLowercaseElements(page,'[data-cy="canvas"]', 'canvasDiv')
    this.buttonsBoxDiv = new BlockLowercaseElements(page, '[data-cy="buttons-box"]', 'buttonsBoxDiv')
    this.submitBoxDiv = new BlockLowercaseElements(page, '[data-cy="submit-box"]', 'submitBoxDiv')
    this.constructorButton = new Button(page, '[data-cy="mode-toggler-constructor"]', 'constructorButton')
    this.runtimeButton = new Button(page, '[data-cy="mode-toggler-runtime"]', 'runtimeButton')
    this.sidebar = new BlockLowercaseElements(page, '[data-cy="sidebar"]', 'sidebar');
    this.lockedContainerInSidebar = new BlockLowercaseElements(page, '[data-cy="locked-drag-container"]', 'lockedContainerInSidebar')
  }
  /**
   * Возвращает объект с кнопками операций 
   * / , * , - , +
   * @returns 
   */
  async getOperationButtons(){
    return {
      division: new Button(this.page, '[data-cy="operation-division"]', 'division'),
      multiplication: new Button(this.page, '[data-cy="operation-multiplication"]', 'multiplication'),
      substraction: new Button(this.page, '[data-cy="operation-substraction"]', 'substraction'),
      addition: new Button(this.page, '[data-cy="operation-addition"]', 'addition')
    }
  }
  /**
   * Возвращает объект с кнопками для ввода данных 
   * кнопки с числами 0-9, кнопка запятой
   * @returns 
   */
  async dataEntryButtons(){
    return {
      '1': new Button(this.page, '[data-cy="digit-1"]', 'one'),
      '2': new Button(this.page, '[data-cy="digit-2"]', 'two'),
      '3': new Button(this.page, '[data-cy="digit-3"]', 'three'),
      '4': new Button(this.page, '[data-cy="digit-4"]', 'four'),
      '5':new Button(this.page, '[data-cy="digit-5"]', 'five'),
      '6':new Button(this.page, '[data-cy="digit-6"]', 'six'),
      '7':new Button(this.page, '[data-cy="digit-7"]', 'seven'),
      '8':new Button(this.page, '[data-cy="digit-8"]', 'eight'),
      '9':new Button(this.page, '[data-cy="digit-9"]', 'nine'),
      '0':new Button(this.page, '[data-cy="digit-0"]', 'zero'),
      ',':new Button(this.page, '[data-cy="digit-,"]', 'comma'),
    }
  }
  /**
   * Перенос элементов из палитры на холст (элемент canvas)
   * и переключение на режим работы калькулятора
   */
  async buildCalculator(){
    await this.canvasEmptyDiv.isVisible()
    await this.displayBoxDiv.dragAndDropTo(this.canvasEmptyDiv.WebElement);
    await this.canvasDiv.isVisible()
    await this.operationBoxDiv.dragAndDropTo(this.canvasDiv.WebElement);
    await this.buttonsBoxDiv.dragAndDropTo(this.canvasDiv.WebElement)
    await this.submitBoxDiv.dragAndDropTo(this.canvasDiv.WebElement)
    await this.runtimeButton.isVisible();
    await this.canvasDiv.isVisible()
    await this.runtimeButton.click();
    await this.runtimeButton.click();
    await expect(this.sidebar.WebElement).toBeHidden();
  }
  /**
   * Удаление элементов с CanvasDiv (полотна) с помощью двойного клика
   * @param elements список удаляемых элементов
   */
  async deleteElements(elements:MovableElementsType[]):Promise<void>{
    await this.constructorButton.click()
    await expect(this.constructorButton.WebElement).toHaveClass(/active/)
    for (const element of elements){
      const innerElement = await this.canvasDiv.getInnerElement(this[element].WebElement)
      await innerElement.dblclick();
    }
  }

  /**
   * Добавление элементов на Canvas (полотно)
   * @param elements список элементов
   */
  async addElementsOnCanvas(elements:MovableElementsType[]):Promise<void>{
    await this.constructorButton.click()
    await expect(this.constructorButton.WebElement).toHaveClass(/active/)
    for (const element  of elements){
      element == elements[0]?
      await this[element].dragAndDropTo(this.canvasEmptyDiv.WebElement)
      : await this[element].dragAndDropTo(this.canvasDiv.WebElement)
      
    }
  }

  /**
   * Проверка, что элемент с определенным data-cy на 
   * определенном месте.
   * Используется для проверки после того, как элементы 
   * из палитры перекинули на палитру CanvasDiv
   * @param expectDataCy ожидаемое значение элемента
   * @param itemNumber номер элемента в CanvasDiv, начинается с 0
   * @param calculator 
   */
  async checkOrderInCanvas(expectDataCy:string, itemNumber:number){
    try {
      expect(await this.canvasDiv.WebElement
        .locator('//div[contains(@data-cy, "box")]')
        .nth(itemNumber)
        .getAttribute('data-cy'))
        .toBe(expectDataCy)
      
    } catch (error) {
      throw new Error(`От тестера!!!В canvasDiv свойство data-cy элемента 
      с номером ${itemNumber} не равно ${expectDataCy}.
      Остальная ошибка: ${error}`)
    }
  }
  

}