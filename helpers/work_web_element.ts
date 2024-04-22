import { IDataCalculation } from "../data_tests/data_calculations";
import { IButtons } from "../components/calculator";
import { Calculator } from "../components/calculator";
/**
 * Прокликивает нужные кнопки
 * @param buttonNames содержит данные для выбора кнопок
 * @param buttons 
 * @returns 
 */
export async function pressingButtons(buttonNames:string[],buttons:IButtons):Promise<void>{
  if (buttonNames.length > 0){
    for (const nameButton of buttonNames){
      await buttons[nameButton].click()
    }
  } else {
    return;
  }
}
/**
 * Выполняет расчеты. Вид зависит от операций в caseData
 * @param calculator 
 * @param caseData строка из DataCalculations
 */
export async function performСalculations(calculator:Calculator, caseData:IDataCalculation, description:string):Promise<void>{
  const buttons = await calculator.dataEntryButtons();
  await pressingButtons(caseData.firstNumber, buttons)
  const operationButtons = await calculator.getOperationButtons();
  await operationButtons[caseData.firstOperation].click();
  await pressingButtons(caseData.secondNumber, buttons)
  if (caseData.secondOperation != 'no'){
    await operationButtons[caseData.secondOperation].click();
    await pressingButtons(caseData.thirdNumber, buttons)
  }
  await calculator.submitBoxDiv.isVisible()
  await calculator.submitBoxDiv.click();
  const textExpected = await calculator.displayInput.WebElement.textContent();
  try {
    await calculator.displayInput.checkText(caseData.result)
  } catch (error) {
    throw new Error(`От тестера. Ожидаемый ${description}.
    Фактический результат расчета: ${textExpected}.
    Остальная ошибка: ${error}`)
  }
}