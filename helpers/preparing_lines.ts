import { IDataCalculation } from "../data_tests/data_calculations";
/**
 * Подготавливает строку описания тестов 
 * для параметризированных тестов расчетов
 * @param data 
 * @returns 
 */
export function getDescriptionParameterizedTests(data:IDataCalculation){
  let partDescription:string;
  partDescription = data.secondOperation == 'no'? '': `${data.secondOperation} ${data.thirdNumber.join('')}`
  return `Расчет: 
  ${data.firstNumber.join('')} ${data.firstOperation} ${data.secondNumber.join('')} 
  ${partDescription} = ${data.result}`
}