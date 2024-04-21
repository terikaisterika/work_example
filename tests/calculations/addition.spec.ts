import {test , expect, Page, Locator} from '@playwright/test'
import { Calculator } from '../../components/calculator'
import { buttonValueComparator, DataCalculations, IDataCalculation } from '../../data_tests/data_calculations'
import { performСalculations } from '../../helpers/work_web_element'
import { getDescriptionParameterizedTests } from '../../helpers/preparing_lines'
import { allure } from 'allure-playwright'
test.describe('r#12 Проверка расчетов сложения', async()=>{
  test.beforeEach(async({page})=>{
    await page.goto('/')
    const calculator = new Calculator(page);
    await calculator.buildCalculator();  
  })
  for (const data of DataCalculations.addition){
    let description = getDescriptionParameterizedTests(data);
    test(description, async ({page})=>{
      const calculator = new Calculator(page);
      await calculator.sidebar.isHidden()
      await performСalculations(calculator, data, description);
    })
  }
  
})