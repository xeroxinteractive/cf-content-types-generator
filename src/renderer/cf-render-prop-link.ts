import {Field} from 'contentful';
import {linkContentTypeValidations, moduleName} from '../utils';
import {renderUnionType} from './render-union-type';

const linkContentType = (field: Pick<Field, 'validations'>): string => {
    const validations = linkContentTypeValidations(field);
    return validations?.length > 0 ? renderUnionType(validations.map(name => `EntryLink<${moduleName(name)}>`)) : 'EntryLink';
};

export const renderPropLink = (field: Pick<Field, 'validations' | 'linkType'>) => {
    if (field.linkType === 'Entry') {
        return linkContentType(field);
    }
    if (field.linkType === 'Asset') {
        return 'AssetLink';
    }
    return 'Contentful.' + field.linkType!;
};
