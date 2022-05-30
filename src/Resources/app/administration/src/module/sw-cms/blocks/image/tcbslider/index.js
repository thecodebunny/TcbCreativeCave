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
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: "tcbslider",
    category: 'image',
    label: 'TheCodeBunny Advanced Slider',
    component: 'sw-cms-block-tcbslider',
    previewComponent: 'sw-cms-preview-tcbslider',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        sizingMode: 'boxed'
    },
    slots: {
        tcbSlider: {
            type: 'tcbslider',
            default: {
                config: {},
                data: {
                    tcbSlide1Image: {
                        value: 'bundles/tcbcreativecave/img/slide.jpg',
                        source: 'static',
                    },
                    tcbSlide1Title: {
                        value: 'TheCodeBunny Advanced <br/> Slider'
                    }
                },
            },
        },
    },
});