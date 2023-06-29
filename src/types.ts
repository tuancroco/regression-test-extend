import { Scenario } from "backstopjs";

export interface ReplacementModel {
  ref: string;
  test: string;
}

export interface TestSuiteModel {
  env?: ReplacementModel[];
  scenarios: ScenarioModel[];
  hideSelectors?: string[];
  removeSelectors?: string[];
  useCssOverride?: boolean;
  cssOverridePath?: string;
  viewportsPath?: string;
}

export interface ScenarioModel extends Scenario {
  description: string;
  cssOverridePath?: string;
  index: number;
  jsOnReadyPath?: string;
  total: number;
  useCssOverride?: boolean;
}