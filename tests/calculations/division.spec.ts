//import {test , expect, Page, Locator} from '@playwright/test'
import {test, expect} from '../../utils/calculatorFixture'
import { Calculator } from '../../components/calculator'
import { buttonValueComparator, DataCalculations, IDataCalculation } from '../../data_tests/data_calculations'
import { performСalculations } from '../../helpers/work_web_element'
import { getDescriptionParameterizedTests } from '../../helpers/preparing_lines'
test.describe('r#9 Проверка расчетов деления', async()=>{
  test.beforeEach(async({page, calculator})=>{
    await page.goto('/')
    //const calculator = new Calculator(page);
    await calculator.buildCalculator();  
  })
  
  for (const data of DataCalculations.division){
    let description = getDescriptionParameterizedTests(data);
    test(description, async ({page})=>{
      const calculator = new Calculator(page);
      await expect(calculator.sidebar.WebElement).toBeHidden();
      await performСalculations(calculator, data, description);
    })
  }
})