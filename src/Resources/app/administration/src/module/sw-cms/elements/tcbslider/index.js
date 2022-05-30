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
        tcbSlide1Image: {
            source: 'static',
            value: '',
            required: true,
            entity: {
                name: 'tcbSlide1Image',
            }
        },
        tcbSlide1Title: {
            source: 'static',
            value: '',
            required: true
        },
        navigationArrows: {
            source: 'static',
            value: 'outside',
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
    }
});
