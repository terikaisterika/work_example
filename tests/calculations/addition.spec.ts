import {test} from '../../utils/calculatorFixture'
import {  DataCalculations} from '../../data_tests/data_calculations'
import { getDescriptionParameterizedTests } from '../../helpers/preparing_lines'
test.describe('r#12 Проверка расчетов сложения', async()=>{
  test.beforeEach(async({calculator})=>{
    await calculator.visit()
    await calculator.buildCalculator();  
  })
  for (const data of DataCalculations.addition){
    let description = getDescriptionParameterizedTests(data);
    test(description, async ({ calculator})=>{
      await calculator.sidebar.isHidden()
      await calculator.performСalculations(data, description);
    })
  }
  
})