import {test, expect} from '../../utils/calculatorFixture'
import { DataCalculations} from '../../data_tests/data_calculations'
import { getDescriptionParameterizedTests } from '../../helpers/preparing_lines'
test.describe('r#11 Проверка расчетов вычитания', async()=>{
  test.beforeEach(async({calculator})=>{
    await calculator.visit();
    await calculator.buildCalculator();  
  })
  
  for (const data of DataCalculations.substraction){
    const description = getDescriptionParameterizedTests(data);
    test(description, async ({calculator})=>{
      await expect(calculator.sidebar.WebElement).toBeHidden();
      await calculator.performСalculations(data, description);
    })
  }

})