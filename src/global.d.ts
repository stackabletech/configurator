/// <reference types="svelte" />

type Technology = {
    id: number;
    name: string;
    img: string;
    imgActive: string;
    command: string;
}

type Config = {
  command: string;
  script: string;
};

type Operator = {
  name: string;
  command: string;
  key: string;
  checked: false;
};