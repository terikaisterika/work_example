import {test,expect} from '../../utils/calculatorFixture'
import { DataCalculations} from '../../data_tests/data_calculations'
import { getDescriptionParameterizedTests } from '../../helpers/preparing_lines'
test.describe('r#10 Проверка расчетов умножения', async()=>{
  test.beforeEach(async({calculator})=>{
    await calculator.visit()
    await calculator.buildCalculator();  
  })
  for (const data of DataCalculations.multiplication){
    let description = getDescriptionParameterizedTests(data);
    test(description, async ({calculator})=>{
      await expect(calculator.sidebar.WebElement).toBeHidden();
      await calculator.performСalculations(data, description);
    })
  }
})