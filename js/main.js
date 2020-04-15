var app = new Vue({
    el: '#app',
    data: {
        title: 'Nueva aplicación',
        input: "",
        message: {
            title: 'Este es el título',
            text: 'Este es un mensaje de prueba',
            show: true
        }
    },
    methods: {
        saludar: function(){
            alert('ho')
        },
        closeMessage: function() {
            this.message.show = false;
        }
    }
})