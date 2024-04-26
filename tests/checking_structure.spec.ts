import {test, expect} from '../utils/calculatorFixture'
import { Calculator, MovableElementsType, } from '../components/calculator'
import { allure } from 'allure-playwright'
import { DataCalculations, IDataCalculation } from '../data_tests/data_calculations'
import { getDescriptionParameterizedTests } from '../helpers/preparing_lines'

test.describe('Проверка перемещений', async()=>{
  test.beforeEach(async({calculator})=>{
    await calculator.visit();
  })
  
  test('r#2 r#3 Элемент возвращается по двойному клику в палитру', async ({calculator})=>{
    await calculator.canvasEmptyDiv.isVisible();
    const listElements:MovableElementsType[] = ['buttonsBoxDiv']
    await calculator.addElementsOnCanvas(listElements)
    await expect(calculator.canvasEmptyDiv.WebElement).toBeHidden();
    await calculator.deleteElements(listElements)
    await calculator.canvasEmptyDiv.isVisible();
  })
  
  test(`r#4 После перехода на холст элемент на полотне не активный 
  Проверки: элемент после переноса в залоченном контейнере.
  залоченный контейнер 'position', 'relative',
  перенесенный элемент с 'opacity', '0.5'`, async ({calculator})=>{
    await calculator.canvasEmptyDiv.isVisible();
    const listElements:MovableElementsType[] = ['buttonsBoxDiv']
    await calculator.addElementsOnCanvas(listElements)
    await calculator.canvasEmptyDiv.isHidden();
    const elementInSidebar = await calculator.lockedContainerInSidebar.getInnerElement(calculator[listElements[0]].Locator)
    await expect(calculator.lockedContainerInSidebar.WebElement).toHaveCSS('position', 'relative')
    await expect(elementInSidebar).toHaveCSS('opacity', '0.5')
  })
  
  test('Убрать все элементы с полотна canvas', async({calculator})=>{
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
    const calculator = new Calculator(page);
    const itemsDelete:MovableElementsType[] = ['operationBoxDiv', 'buttonsBoxDiv','submitBoxDiv','displayBoxDiv'];
    await calculator.addElementsOnCanvas(itemsDelete)
    await calculator.canvasEmptyDiv.isHidden()
    await calculator.checkOrderInCanvas('display-box', 0);
  })
  test(`r#1 r#14 При любом порядке частей калькулятора на полотно расчет правильный.
  Порядок: дисплей, кнопки операций, кнопки данных, кнопка '='`, async({calculator})=>{
    const itemsDelete:MovableElementsType[] = ['displayBoxDiv','operationBoxDiv', 'buttonsBoxDiv','submitBoxDiv'];
    await calculator.addElementsOnCanvas(itemsDelete)
    await calculator.canvasEmptyDiv.isHidden()
    const data = DataCalculations.addition[0];
    const description = getDescriptionParameterizedTests(data)
    await calculator.runtimeButton.click();
    await calculator.runtimeButton.click();
    await expect(calculator.runtimeButton.WebElement).toHaveClass(/active/)
    await calculator.sidebar.isHidden();
    await calculator.performСalculations(data, description);
  })
  test(`r#1 r#14 При любом порядке частей калькулятора на полотно расчет правильный.
  Порядок: дисплей,кнопка '=', кнопки данных, кнопки операций`, async({calculator})=>{
    const itemsDelete:MovableElementsType[] = ['displayBoxDiv','submitBoxDiv', 'buttonsBoxDiv', 'operationBoxDiv'];
    await calculator.addElementsOnCanvas(itemsDelete)
    await calculator.canvasEmptyDiv.isHidden()
    const data = DataCalculations.addition[0];
    const description = getDescriptionParameterizedTests(data)
    await calculator.runtimeButton.click();
    await calculator.runtimeButton.click();
    await expect(calculator.runtimeButton.WebElement).toHaveClass(/active/)
    await calculator.sidebar.isHidden();
    await calculator.performСalculations(data, description);
  })
  test(`r#5 Полный путь. Проверить активность кнопки конструктора, собрать калькулятор, 
  переключиться на режим runtime, проверить активность кнопки конструктора,
  выполнить верный расчет, переключиться на режим конструктора, разобрать калькулятор`, async ({page, calculator})=>{
    const itemsDelete:MovableElementsType[] = ['displayBoxDiv','submitBoxDiv', 'buttonsBoxDiv', 'operationBoxDiv'];
    await expect(calculator.constructorButton.WebElement).toHaveClass(/active/)
    await calculator.addElementsOnCanvas(itemsDelete)
    await calculator.canvasEmptyDiv.isHidden()
    const data = DataCalculations.addition[0];
    const description = getDescriptionParameterizedTests(data)
    await calculator.runtimeButton.click();
    await calculator.runtimeButton.click();
    await expect(calculator.runtimeButton.WebElement).toHaveClass(/active/)
    await calculator.sidebar.isHidden();
    await calculator.performСalculations(data, description);
    await calculator.constructorButton.click();
    await calculator.constructorButton.click();
    await expect(calculator.constructorButton.WebElement).toHaveClass(/active/)
    await calculator.deleteElements(itemsDelete);
    await calculator.sidebar.isVisible();
  })
  test(`#6 В режиме конструктора расчет не возможен. 
  Кейс: Включен режим конструктор,
  Собрать калькулятор, 
  Найти кнопки в полотне (canvasDiv).
  Прокликать расчет через {force:true}, проверяя после каждого ввода 0 в дисплее`, async({calculator})=>{
    const itemsDelete:MovableElementsType[] = ['displayBoxDiv','submitBoxDiv', 'buttonsBoxDiv', 'operationBoxDiv'];
    await expect(calculator.constructorButton.WebElement).toHaveClass(/active/)
    await calculator.addElementsOnCanvas(itemsDelete)
    await calculator.canvasEmptyDiv.isHidden()
    const dataButtons = await calculator.dataEntryButtons()
    const operationButtons = await calculator.getOperationButtons();
    const buttonOneInCanvas = await calculator.canvasDiv.getInnerElement(dataButtons['1'].WebElement)
    const buttonTwoInCanvas = await calculator.canvasDiv.getInnerElement(dataButtons['2'].WebElement)
    const additionButtonInCanvas = await calculator.canvasDiv.getInnerElement(operationButtons.addition.WebElement)
    const displayInCanvas = await calculator.canvasDiv.getInnerElement(calculator.displayInput.WebElement)
    const submitButtonInCanvas = await calculator.canvasDiv.getInnerElement(calculator.submitBoxDiv.WebElement)
    await buttonOneInCanvas.click({force:true});
    await expect(displayInCanvas).toHaveText('0');
    await additionButtonInCanvas.click({force:true});
    await expect(displayInCanvas).toHaveText('0');
    await buttonTwoInCanvas.click({force:true});
    await expect(displayInCanvas).toHaveText('0');
    await submitButtonInCanvas.click({force:true});
    await expect(displayInCanvas).toHaveText('0');
    
  })
  test(`В режиме runtime перетаскивать ничего нельзя 
  Кейс: Собрать калькулятор, 
  переключиться на режим runtime,
  проверить, что палитра компонентов (sidebar) скрыта `, async({calculator})=>{
    const itemsDelete:MovableElementsType[] = ['displayBoxDiv','submitBoxDiv', 'buttonsBoxDiv', 'operationBoxDiv'];
    await expect(calculator.constructorButton.WebElement).toHaveClass(/active/)
    await calculator.addElementsOnCanvas(itemsDelete)
    await calculator.canvasEmptyDiv.isHidden()
    await calculator.runtimeButton.click();
    await calculator.runtimeButton.click();
    await expect(calculator.runtimeButton.WebElement).toHaveClass(/active/)
    await calculator.sidebar.isHidden();
  })
})