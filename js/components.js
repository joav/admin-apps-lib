Vue.component('simple-button', {
    props: ['text','custom'],
    template: `<button
    class="simple-btn"
    :class="custom"
    @click="$emit('click')"
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
    props: ['type', 'placeholder', 'value'],
    template: `<input
    class="simple-input"
    :type="type"
    :placeholder="placeholder"
    :value="value"
    @input="$emit('input', $event.target.value)"
    >`
})

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
