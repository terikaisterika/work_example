import {test as base} from '@playwright/test'
import { Calculator } from '../components/calculator'

export const test = base.extend<{calculator:Calculator}>({
  calculator: async ({page}, use)=>{
    await use(new Calculator(page))
  }
})


export const expect = base.expect;