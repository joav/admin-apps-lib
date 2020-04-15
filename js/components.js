Vue.component('simple-button', {
    props: ['text','custom'],
    template: `<button
    class="simple-btn"
    :class="custom"
    @click="$emit('click')"
    type="button"
    >{{text}}</button>`
});

Vue.component('simple-file', {
    props: ['text','accept','multiple'],
    methods: {
        openFileDialog: function(){
            this.$el.querySelector('input').click()
        }
    },
    template: `<span>
    <input
        type="file"
        class="hide"
        :accept="accept"
        @change="$emit('change', $event.target.files)"
        :multiple="multiple"
    >
    <simple-button :text="text" @click="openFileDialog" />
</span>`
});

Vue.component('simple-input', {
    props: ['type', 'placeholder', 'value', 'readonly'],
    template: `<input
    class="simple-input"
    :type="type"
    :placeholder="placeholder"
    :value="value"
    :readonly="readonly"
    @input="$emit('input', $event.target.value)"
    >`
});

Vue.component('simple-box', {
    props: {
        title: String,
        text: String,
        showaccept: {
            type: Boolean,
            default: true
        },
        showcancel: {
            type: Boolean,
            default: true
        },
        accepttext: {
            type: String,
            default: 'Aceptar'
        },
        canceltext: {
            type: String,
            default: 'Cancelar'
        },
    },
    methods: {
        accept: function(){
            this.$emit('accept');
            this.close();
        },
        cancel: function(){
            this.$emit('accept');
            this.close();
        },
        close: function(){
            this.$emit('close');
        }
    },
    template: `<div class="box">
    <div class="content">
        <div class="close" @click="close">X</div>
        <h2 class="title">{{title}}</h2>
        <p class="text">{{text}}</p>
        <div class="btns" v-if="showaccept || showcancel" >
            <simple-button v-if="showaccept" :text="accepttext" @click="accept"></simple-button>
            <simple-button v-if="showcancel" :text="canceltext" @click="cancel" class="cancel"></simple-button>
        </div>
    </div>
</div>`
});

function readFile(file, callback){
    var reader = new FileReader();

    reader.onload = function(e){
        callback(null, e.target.result);
    };

    reader.onerror = function(e){
        callback(e.target.error, null);
    };

    reader.readAsText(file);
}

function readJson(file, callback){
    readFile(file, function(error, data){
        callback(error, JSON.parse(data));
    });
}
