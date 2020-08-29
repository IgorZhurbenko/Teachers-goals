Vue.component(
    'page',
    {
        template : `
                    <div class='VuePage'>
                        Page
                    </div>
                    `
    }
);


Vue.component(
    'pages',
    {
        template: `
                 <div class='VuePages' onclick='listChildren()'>
                    Pages
                   </div>
                `,
        methods: {
            listChildren: function ()
            {
                var message = "";
                for (var node of this.childNodes)
                {
                    message = message + "\n" + node.innerHTML;
                }
                alert(message);
            }
        }
    }
)