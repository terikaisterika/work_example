import {test, expect} from '../../utils/calculatorFixture'
import { DataCalculations, IDataCalculation } from '../../data_tests/data_calculations'
import { getDescriptionParameterizedTests } from '../../helpers/preparing_lines'
test.describe('r#9 Проверка расчетов деления', async()=>{
  test.beforeEach(async({calculator})=>{
    await calculator.visit()
    await calculator.buildCalculator();  
  })
  
  for (const data of DataCalculations.division){
    let description = getDescriptionParameterizedTests(data);
    test(description, async ({calculator})=>{
      await expect(calculator.sidebar.WebElement).toBeHidden();
      await calculator.performСalculations(data, description);
    })
  }
})