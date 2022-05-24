/*
 * Copyright (c) 2022. TheCodeBunny (Hemang Vyas) All rights reserved.
 *  
 *  Unauthorized copying of this file, via any medium is strictly prohibited Proprietary and confidential.
 *
 * Author : Hemang Vyas (TheCodeBunny)
 * Website: https://hemangvyas.com
 * Email: hemang@hemangvyas.com
 */

import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'tcbslider',
    label: 'sw-cms.elements.tcbSlider.label',
    component: 'sw-cms-el-tcbslider',
    configComponent: 'sw-cms-el-config-tcbslider',
    previewComponent: 'sw-cms-el-preview-tcbslider',
    defaultConfig: {
        tcbSlideImage: {
            source: 'static',
            value: '',
            required: true
        },
        tcbSlide1Title: {
            source: 'static',
            value: '',
            required: true
        },
        tcbSliderItems: {
            source: 'static',
            value: [],
            required: true,
            entity: {
                name: 'media',
            },
        },
        navigationArrows: {
            source: 'static',
            value: 'inside',
        },
        navigationDots: {
            source: 'static',
            value: null,
        },
        displayMode: {
            source: 'static',
            value: 'standard',
        },
        minHeight: {
            source: 'static',
            value: '300px',
        },
        verticalAlign: {
            source: 'static',
            value: null,
        },
    },
    enrich: function enrich(elem, data) {
        if (Object.keys(data).length < 1) {
            return;
        }

        Object.keys(elem.config).forEach((configKey) => {
            const entity = elem.config[configKey].entity;

            if (!entity) {
                return;
            }

            const entityKey = entity.name;
            if (!data[`entity-${entityKey}`]) {
                return;
            }

            elem.data[configKey] = [];
            elem.config[configKey].value.forEach((tcbSliderItem) => {
                elem.data[configKey].push({
                    newTab: tcbSliderItem.newTab,
                    url: tcbSliderItem.url,
                    media: data[`entity-${entityKey}`].get(tcbSliderItem.mediaId),
                });
            });
        });
    },
});
