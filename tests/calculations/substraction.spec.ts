//import {test , expect, Page, Locator} from '@playwright/test'
import {test, expect} from '../../utils/calculatorFixture'
import { Calculator } from '../../components/calculator'
import { buttonValueComparator, DataCalculations, IDataCalculation } from '../../data_tests/data_calculations'
import { performСalculations } from '../../helpers/work_web_element'
import { getDescriptionParameterizedTests } from '../../helpers/preparing_lines'
import { allure } from 'allure-playwright'
test.describe('r#11 Проверка расчетов вычитания', async()=>{
  test.beforeEach(async({page})=>{
    await page.goto('/')
    const calculator = new Calculator(page);
    await calculator.buildCalculator();  
  })
  
  for (const data of DataCalculations.substraction){
    const description = getDescriptionParameterizedTests(data);
    test(description, async ({page})=>{
      const calculator = new Calculator(page);
      await expect(calculator.sidebar.WebElement).toBeHidden();
      await performСalculations(calculator, data, description);
    })
  }

})