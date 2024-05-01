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
            tabs: ['Добавить заметку', 'Все заметки', 'Корзина'],
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
        <div v-show="tab == 'Добавить заметку'">
            <form>
                <h1>Создать заметку</h1>
                <div>
                    <lable for="title_card">Заголовок</lable>
                    <input id="title_card" type="text" maxlength="50" v-model="card.title">
                </div>
                <div>
                    <lable for="body_card">Что там по делам?</lable>
                    <input type="text" style="border:none; outline:none">
                </div>
                <div v-for="(tasks, index) in card.tasks">
                    <div>
                        <input type="checkbox" disabled>
                        <input type="text" placeholder="Задача №1">
                    </div>
                </div>
            </form>
        </div>
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
                title: "Новая заметка",
                tasks: []
            }
        }
     }

         //  methods: {
    //     addTask() {
    //         if (this.card.tasks.length < 5){
    //             this.card.tasks.push({title:})
    //         }
    //     }
    //  },
})

Vue.component('column', {

}),

Vue.component('task', {

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
        }
    }
})
