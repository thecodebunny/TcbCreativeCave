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

    props: {
        activeMedia: {
            type: [Object, null],
            required: false,
            default: null,
        },
    },

    data() {
        return {
            columnCount: 7,
            columnWidth: 90,
            sliderPos: 0,
            imgPath: 'tcbcreativecave/img/slide.jpg',
            imgSrc: '',
        };
    },

    computed: {
        gridAutoRows() {
            return `grid-auto-rows: ${this.columnWidth}`;
        },

        uploadTag() {
            return `cms-element-media-config-${this.element.id}`;
        },

        tcbSliderItems() {
            if (this.element?.config?.tcbSliderItems?.source === 'mapped') {
                return this.getDemoValue(this.element.config.tcbSliderItems.value) || [];
            }

            if (this.element.data && this.element.data.tcbSliderItems && this.element.data.tcbSliderItems.length > 0) {
                return this.element.data.tcbSliderItems;
            }

            return [];
        },

        displayModeClass() {
            if (this.element.config.displayMode.value === 'standard') {
                return null;
            }

            return `is--${this.element.config.displayMode.value}`;
        },

        styles() {
            if (this.element.config.displayMode.value === 'cover' &&
                this.element.config.minHeight.value &&
                this.element.config.minHeight.value !== 0) {
                return {
                    'min-height': this.element.config.minHeight.value,
                };
            }

            return {};
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

        assetFilter() {
            return Filter.getByName('asset');
        },
    },

    watch: {
        // @deprecated tag:v6.5.0 use tcbSliderItems instead
        'element.data.tcbSliderItems': {
            handler() {
                return null;
            },
            deep: true,
        },

        tcbSliderItems: {
            handler() {
                if (this.tcbSliderItems && this.tcbSliderItems.length > 0) {
                    this.imgSrc = this.tcbSliderItems[0].media.url;
                    this.$emit('active-image-change', this.tcbSliderItems[0].media);
                } else {
                    this.imgSrc = this.assetFilter(this.imgPath);
                }
            },
            deep: true,
        },

        activeMedia() {
            this.sliderPos = this.activeMedia.sliderIndex;
            this.imgSrc = this.activeMedia.url;
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('tcbslider');
            this.initElementData('tcbslider');

            if (this.tcbSliderItems && this.tcbSliderItems.length > 0) {
                this.imgSrc = this.tcbSliderItems[0].media.url;
                this.$emit('active-image-change', this.tcbSliderItems[this.sliderPos].media);
            } else {
                this.imgSrc = this.assetFilter(this.imgPath);
            }
        },

        setSliderItem(mediaItem, index) {
            this.imgSrc = mediaItem.url;
            this.sliderPos = index;
            this.$emit('active-image-change', mediaItem, index);
        },

        activeButtonClass(url) {
            return {
                'is--active': this.imgSrc === url,
            };
        },

        setSliderArrowItem(direction = 1) {
            if (this.tcbSliderItems.length < 2) {
                return;
            }

            this.sliderPos += direction;

            if (this.sliderPos < 0) {
                this.sliderPos = this.tcbSliderItems.length - 1;
            }

            if (this.sliderPos > this.tcbSliderItems.length - 1) {
                this.sliderPos = 0;
            }

            this.imgSrc = this.tcbSliderItems[this.sliderPos].media.url;
            this.$emit('active-image-change', this.tcbSliderItems[this.sliderPos].media, this.sliderPos);
            this.$emit('active-image-change', this.tcbSliderItems[this.sliderPos].media, this.sliderPos);
        },
    },
});
