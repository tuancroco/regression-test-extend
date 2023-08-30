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
  debug?: boolean;
}

export interface ScenarioModel extends Scenario {
  id?: string;
  needs?: string | string[];
  actions?: unknown[];
  description: string;
  cssOverridePath?: string;
  index: number;
  jsOnReadyPath?: string;
  total: number;
  viewportNames?: string[];
  useCssOverride?: boolean;
}