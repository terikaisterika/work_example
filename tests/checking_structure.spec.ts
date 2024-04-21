import {test, expect} from '@playwright/test'
import { Calculator, MovableElementsType, } from '../components/calculator'
import { allure } from 'allure-playwright'
import { DataCalculations, IDataCalculation } from '../data_tests/data_calculations'
import { getDescriptionParameterizedTests } from '../helpers/preparing_lines'
import {  performСalculations } from '../helpers/work_web_element'
test.describe('Проверка перемещений', async()=>{
  test.beforeEach(async({page})=>{
    await page.goto('/')
  })
  
  test('r#2 r#3 Элемент возвращается по двойному клику в палитру', async ({page})=>{
    const calculator = new Calculator(page);
    await calculator.canvasEmptyDiv.isVisible();
    const listElements:MovableElementsType[] = ['buttonsBoxDiv']
    await calculator.addElementsOnCanvas(listElements)
    await expect(calculator.canvasEmptyDiv.WebElement).toBeHidden();
    await calculator.deleteElements(listElements)
    await calculator.canvasEmptyDiv.isVisible();
  })
  
  test(`r#4 После перехода на холст элемент не активный 
  Проверки: элемент после переноса в залоченном контейнере.
  залоченный контейнер 'position', 'relative',
  перенесенный элемент с 'opacity', '0.5'`, async ({page})=>{
    const calculator = new Calculator(page);
    await calculator.canvasEmptyDiv.isVisible();
    const listElements:MovableElementsType[] = ['buttonsBoxDiv']
    await calculator.addElementsOnCanvas(listElements)
    await calculator.canvasEmptyDiv.isHidden();
    const elementInSidebar = await calculator.lockedContainerInSidebar.getInnerElement(calculator[listElements[0]].Locator)
    await expect(calculator.lockedContainerInSidebar.WebElement).toHaveCSS('position', 'relative')
    await expect(elementInSidebar).toHaveCSS('opacity', '0.5')
  })
  
  test('Убрать все элементы с полотна canvas', async({page})=>{
    const calculator = new Calculator(page);
    const itemsDelete:MovableElementsType[] = ['operationBoxDiv', 'buttonsBoxDiv','submitBoxDiv','displayBoxDiv'];
    await calculator.addElementsOnCanvas(itemsDelete)
    await calculator.deleteElements(itemsDelete)
    await calculator.checkOrderInCanvas('display-box', 0);
    await allure.step(`После удаления всех элементов должен быть виден 
    canvasEmptyDiv. Если есть ошибка, значит какой-то 
    элемент не удалился`, async()=>{
      await calculator.canvasEmptyDiv.isVisible();
    })
  })
  test('r#2 r#13 При любом порядке выкладывания на полотно дисплей должен быть первым', async({page})=>{
    //await page.goto('/')
    const calculator = new Calculator(page);
    const itemsDelete:MovableElementsType[] = ['operationBoxDiv', 'buttonsBoxDiv','submitBoxDiv','displayBoxDiv'];
    await calculator.addElementsOnCanvas(itemsDelete)
    await calculator.canvasEmptyDiv.isHidden()
    await calculator.checkOrderInCanvas('display-box', 0);
  })
  test(`r#1 r#14 При любом порядке частей калькулятора на полотно расчет правильный.
  Порядок: дисплей, кнопки операций, кнопки данных, кнопка '='`, async({page})=>{
    //await page.goto('/')
    const calculator = new Calculator(page);
    const itemsDelete:MovableElementsType[] = ['displayBoxDiv','operationBoxDiv', 'buttonsBoxDiv','submitBoxDiv'];
    await calculator.addElementsOnCanvas(itemsDelete)
    await calculator.canvasEmptyDiv.isHidden()
    const data = DataCalculations.addition[0];
    const description = getDescriptionParameterizedTests(data)
    await calculator.runtimeButton.click();
    await calculator.runtimeButton.click();
    await expect(calculator.runtimeButton.WebElement).toHaveClass(/active/)
    await calculator.sidebar.isHidden();
    await performСalculations(calculator, data, description);
  })
  test(`r#1 r#14 При любом порядке частей калькулятора на полотно расчет правильный.
  Порядок: дисплей,кнопка '=', кнопки данных, кнопки операций`, async({page})=>{
    //await page.goto('/')
    const calculator = new Calculator(page);
    const itemsDelete:MovableElementsType[] = ['displayBoxDiv','submitBoxDiv', 'buttonsBoxDiv', 'operationBoxDiv'];
    await calculator.addElementsOnCanvas(itemsDelete)
    await calculator.canvasEmptyDiv.isHidden()
    const data = DataCalculations.addition[0];
    const description = getDescriptionParameterizedTests(data)
    await calculator.runtimeButton.click();
    await calculator.runtimeButton.click();
    await expect(calculator.runtimeButton.WebElement).toHaveClass(/active/)
    await calculator.sidebar.isHidden();
    await performСalculations(calculator, data, description);
  })
  
})