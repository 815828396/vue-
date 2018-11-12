import dialog from './model.vue'

const Mdialog = {
    install: function (Vue) {
        Vue.component('Dialog', dialog)
    }
}

export default Mdialog