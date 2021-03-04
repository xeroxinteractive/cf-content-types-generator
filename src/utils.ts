import {FieldItem, FieldValidation} from 'contentful';
import {camelCase, upperFirst} from 'lodash';
import {pipe} from 'lodash/fp';

export const moduleName = (name: string): string => {
    const removeSpace = (input: string): string => input.replace(/\s/g, '');
    const replaceDash = (input: string): string => input.replace(/-/g, '__');
    const addPrefix = (input: string): string => input.endsWith('CMSEntry') ? input : `${input}CMSEntry`;
    return pipe([replaceDash, upperFirst, addPrefix, removeSpace])(name);
};

export const moduleManagementName = (name: string): string => {
    const removeSpace = (input: string): string => input.replace(/\s/g, '');
    const replaceDash = (input: string): string => input.replace(/-/g, '__');
    const addPrefix = (input: string): string => input.endsWith('CMSManagementEntry') ? input : `${input}CMSManagementEntry`;
    return pipe([replaceDash, upperFirst, addPrefix, removeSpace])(name);
};

export const moduleFieldsName = (name: string): string => moduleName(name) + 'Fields';

export const moduleTypeIdName = (name: string): string => camelCase(moduleName(name).replace(/CMSEntry$/, '')) + 'TypeId';

type WithValidations = Pick<FieldItem, 'validations'>;

const validation = (node: WithValidations, field: keyof FieldValidation): any => {
    if (node.validations && node.validations.length !== 0) {
        const linkContentValidation = node.validations.find(value => value[field]);
        if (linkContentValidation) {
            return linkContentValidation[field] || [];
        }
    }
    return [];
};

export const linkContentTypeValidations = (node: WithValidations): string[] => validation(node, 'linkContentType');
export const inValidations = (node: WithValidations): string[] => validation(node, 'in');
