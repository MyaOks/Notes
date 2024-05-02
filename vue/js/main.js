Vue.component('menu_tabs', {
    
    template: `
        <div>
            <div class="menu">
                <span class="tab"
                      :class="{activeTab: selectedTab === tab}"
                      v-for="(tab, index) in tabs"
                      @click="selectedTab = tab; updateSelectedTab(tab)"
                >
                    {{ tab }}
                </span>
            </div>
        </div>
    `,

    data() {
        return {
            tabs: ['Добавить заметку', 'Все заметки'],
            selectedTab: 'Добавить заметку',
        }
    },

    methods: {
        updateSelectedTab(tab) {
            this.$emit('tab-changed', tab);
        }
    }
}),

Vue.component('add_card', {
    template: `
        <form class="form_add_cart" v-show="tab == 'Добавить заметку'">
            <h1>Создать заметку</h1>
            <p v-if="errors.length">
                <b>Пожалуйста исправте следующие ошибки:</b>
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </p>
            <div>
                <label for="title_card">Заголовок</label>
                <input id="title_card" type="text" maxlength="50" placeholder="Новая заметка" v-model="card.title">
            </div>
            <div>
                <label for="body_card">Что там по делам?</label>
                <textarea rows="5" v-model="card.text" placeholder="Можете что-нибудь здесь написать"></textarea>
            </div>
            <div>
                <div>
                    <h4 v-show="card.tasks.length < 3">Задач должно быть как минимум три</h4>
                    <h4 v-show="card.tasks.length == 5">Достигнуто максимальное количество задач</h4>
                    <div v-for="(task, index) in card.tasks">
                        <input type="checkbox" disabled>
                        <input type="text" placeholder="Задача" v-model="task.title">
                    </div>
                </div>
                <div>
                    <button type="button" @click="addTask" :class="{disabledButtonDelAddTask: card.tasks.length == 5}">Добавить задачу</button>
                    <button type="button" @click="delTask" :class="{disabledButtonDelAddTask: card.tasks.length == 0}">Удалить задачу</button>
                </div>
            </div>
            <button type="button" @click="addCard" :class="{disabledButtonAddCard: card.tasks.length < 3}">Добавить заметку</button>
        </form>
    `,

    props: {
        tab: {
            required: true
        }
     },

     data() {
        return {
            errors: [],
            card: {
                title: "",
                text: "",
                tasks: [
                    {title: "", done: false},
                    {title: "", done: false},
                    {title: "", done: false},
                ],
                date: new Date().toLocaleTimeString() + ' ' + new Date().toLocaleDateString()
            },
        }
     },

    methods: {
        addTask() {
            if(this.card.tasks.length < 5) {
                this.card.tasks.push({title:"", done: false})
            }
        },

        delTask() {
            this.card.tasks.pop()
        }, 

        addCard() {
            if(this.card.title && this.card.tasks.filter(tasks => tasks.title).length == this.card.tasks.length){
                let bodyCard = {
                    title: this.card.title,
                    text: this.card.text, 
                    task: this.card.tasks,
                    date: this.card.date
                }
                this.$emit('add-task', bodyCard);
                location.reload();
            } else {
                if(!this.card.title) this.errors.push("Заголовок не заполнен")
                if(this.card.tasks.filter(tasks => tasks.title).length != this.card.tasks.length) this.errors.push("Какой-то из пунктов списка задач пуст")
            }
        }
     },
})

Vue.component('column', {

    props: {
        column: {
            title: '',
            cards: [],
            date: ''
        },
        tab: {
            required: true
        }
    },

    template: `
        <div class="column" v-show="tab == 'Все заметки'">
            <h2>{{ column.title }}</h2>
            <div>
                <card v-for="(card, index) in column.cards" :key="index"></card>
            </div>
        </div>
    `,

    updated() {
        this.$emit('save')
    },

}),

Vue.component('card', {
    
})

let app = new Vue({
    el: '#app',
    data: {
        columns: [
            {
                index: 0,
                title: "Новые",
                cards: [],
                disabled: false
            },
            { 
                index: 1,
                title: "В процессе выполнения",
                cards: []
            },
            { 
                index: 2,
                title: "Завершённые",
                cards: []
            }
        ],
        tab: 'Добавить заметку',
    },

    methods: {
        handleTabChange(tab) {
            this.tab = tab;
        },

        save() {
            localStorage.setItem('columns', JSON.stringify(this.columns))
        },
    }
})
