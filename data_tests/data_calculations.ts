export type typesOperations = 'division'|'multiplication'|'substraction'|'addition'|'no';
export interface IDataCalculation{
  firstNumber: string[],
  firstOperation: typesOperations,
  secondNumber:string[],
  secondOperation: typesOperations,
  thirdNumber:string[],
  result: string
}

export const buttonValueComparator = {
  '1': 'one',
  '2': 'two',
  '3': 'three',
  '4': 'four',
  '5': 'five',
  '6': 'six',
  '7': 'seven',
  '8': 'eight',
  '9': 'nine',
  '0': 'zero',
  ',': 'comma'
}
export class DataCalculations{
  static division:IDataCalculation[]=[
    {firstNumber: ['4'], firstOperation: 'division',secondNumber: ['2'], secondOperation:'no', thirdNumber: [], result: '2'},
    {firstNumber: ['5'], firstOperation: 'division', secondNumber: ['2'],secondOperation:'no', thirdNumber: [],result: '2,5'},
    {firstNumber: ['0', ',','1'], firstOperation: 'division', secondNumber: ['2'],secondOperation:'no', thirdNumber: [],result: '0,05'},
    {firstNumber: ['1', '0'], firstOperation: 'division', secondNumber: ['2', ',','5'],secondOperation:'no', thirdNumber: [],result: '4'},
    {firstNumber: ['1', '0'], firstOperation: 'division', secondNumber: ['0', ',','4'],secondOperation:'no', thirdNumber: [],result: '25'},
    {firstNumber: ['1'], firstOperation: 'division', secondNumber: ['3'],secondOperation:'no', thirdNumber: [],result: '0,333333333333333'},
    {firstNumber: ['9'], firstOperation: 'division', secondNumber: ['2'],secondOperation:'division', thirdNumber: ['5'],result: '0,9'},
    {firstNumber: ['1'], firstOperation: 'division', secondNumber: ['0'],secondOperation:'no', thirdNumber: [],result: 'Cannot divide by zero'},
  ]
  static multiplication:IDataCalculation[]=[
    {firstNumber: ['3'], firstOperation: 'multiplication',secondNumber: ['5'], secondOperation:'no', thirdNumber: [], result: '15'},
    {firstNumber: ['9'], firstOperation: 'multiplication',secondNumber: ['1',',','3'], secondOperation:'no', thirdNumber: [], result: '11,7'},
    {firstNumber: ['1',',','8','9','5'], firstOperation: 'multiplication',secondNumber: ['9'], secondOperation:'no', thirdNumber: [], result: '17,055'},
    {firstNumber: ['9'], firstOperation: 'multiplication',secondNumber: ['0'], secondOperation:'no', thirdNumber: [], result: '0'},
    {firstNumber: ['7','0','0'], firstOperation: 'multiplication',secondNumber: ['1','0'], secondOperation:'no', thirdNumber: [], result: '7000'},
    {firstNumber: ['0',',','1'], firstOperation: 'multiplication',secondNumber: ['2'], secondOperation:'no', thirdNumber: [], result: '0,2'},
    {firstNumber: ['2'], firstOperation: 'multiplication',secondNumber: ['2'], secondOperation:'multiplication', thirdNumber: ['2'], result: '8'}
  ]
  static substraction:IDataCalculation[]=[
    {firstNumber: ['1','0'], firstOperation: 'substraction',secondNumber: ['5'], secondOperation:'no', thirdNumber: [], result: '5'},
    {firstNumber: ['0'], firstOperation: 'substraction',secondNumber: ['5'], secondOperation:'no', thirdNumber: [], result: '-5'},
    {firstNumber: ['9'], firstOperation: 'substraction',secondNumber: ['0',',','2','7','9','3'], secondOperation:'no', thirdNumber: [], result: '8,7207'},
  ]
  static addition:IDataCalculation[]=[
    {firstNumber: ['3'], firstOperation: 'addition',secondNumber: ['2',',','5'], secondOperation:'no', thirdNumber: [], result: '5,5'},
    {firstNumber: ['0', ',','1'], firstOperation: 'addition', secondNumber: ['1',',','9'],secondOperation:'no', thirdNumber: [],result: '2'},
    {firstNumber: ['0', ',','7'], firstOperation: 'addition',secondNumber: ['2'], secondOperation:'no',thirdNumber: [], result: '2,7'},
    {firstNumber: ['3'], firstOperation: 'addition', secondNumber: ['2'], secondOperation:'addition',thirdNumber: ['1'], result: '6'}, 
    {firstNumber: ['1','0','0','1'],firstOperation: 'addition', secondNumber: ['1','0','0','1'], secondOperation:'no', thirdNumber: [], result: '2002'}
  ]
  
}