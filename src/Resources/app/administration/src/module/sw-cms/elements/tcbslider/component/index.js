/*
 * Copyright (c) 2022. TheCodeBunny (Hemang Vyas) All rights reserved.
 *  
 *  Unauthorized copying of this file, via any medium is strictly prohibited Proprietary and confidential.
 *
 * Author : Hemang Vyas (TheCodeBunny)
 * Website: https://hemangvyas.com
 * Email: hemang@hemangvyas.com
 */
import template from './sw-cms-el-tcbslider.html.twig';
import './sw-cms-el-tcbslider.scss';

const { Component, Mixin, Filter } = Shopware;

Component.register('sw-cms-el-tcbslider', {
    template,

    inject: ['feature'],

    mixins: [
        Mixin.getByName('cms-element'),
    ],

    computed: {
        displayModeClass() {
            if (this.element.config.displayMode.value === 'standard') {
                return null;
            }

            return `is--${this.element.config.displayMode.value}`;
        },

        styles() {
            return {
                'min-height': this.element.config.displayMode.value === 'cover' &&
                this.element.config.minHeight.value &&
                this.element.config.minHeight.value !== 0 ? this.element.config.minHeight.value : '340px',
            };
        },

        imgStyles() {
            return {
                'align-self': this.element.config.verticalAlign.value || null,
            };
        },

        mediaUrl() {
            const fallBackImageFileName = 'bundles/tcbcreativecave/img/slide.jpg';
            const staticFallBackImage = 'bundles/tcbcreativecave/img/slide.jpg';
            const elemData = this.element.data.tcbSlide1Image;
            const elemConfig = this.element.config.tcbSlide1Image;

            console.log(this.element);

            if (elemConfig.source === 'mapped') {
                const demoMedia = this.getDemoValue(elemConfig.value);

                if (demoMedia?.url) {
                    return demoMedia.url;
                }

                return staticFallBackImage;
            }

            if (elemConfig.source === 'default') {
                // use only the filename
                const fileName = elemConfig.value.slice(elemConfig.value.lastIndexOf('/') + 1);
                return this.assetFilter(`/administration/static/img/cms/${fileName}`);
            }

            if (elemData?.id) {
                return this.element.data.tcbSlide1Image.url;
            }

            if (elemData?.url) {
                return this.assetFilter(elemConfig.url);
            }

            return staticFallBackImage;
        },

        assetFilter() {
            return Filter.getByName('asset');
        },

        outsideNavArrows() {
            if (this.element.config.navigationArrows.value === 'outside') {
                return 'has--outside-arrows';
            }

            return null;
        },

        navDotsClass() {
            if (this.element.config.navigationDots.value) {
                return `is--dot-${this.element.config.navigationDots.value}`;
            }

            return null;
        },

        navArrowsClass() {
            if (this.element.config.navigationArrows.value) {
                return `is--nav-${this.element.config.navigationArrows.value}`;
            }

            return null;
        },

        verticalAlignStyle() {
            if (!this.element.config.verticalAlign.value) {
                return null;
            }

            return `align-self: ${this.element.config.verticalAlign.value};`;
        },
    },

    watch: {
        cmsPageState: {
            deep: true,
            handler() {
                this.$forceUpdate();
            },
        },

        mediaConfigValue(value) {
            const mediaId = this.element?.data?.tcbSlide1Image?.id;
            const isSourceStatic = this.element?.config?.tcbSlide1Image?.source === 'static';

            if (isSourceStatic && mediaId && value !== mediaId) {
                this.element.config.tcbSlide1Image.value = mediaId;
            }
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('tcbslider');
            this.initElementData('tcbslider');
        },

        setSliderArrowItem(direction = 1) {

            this.sliderPos += direction;

        },
    },
});
