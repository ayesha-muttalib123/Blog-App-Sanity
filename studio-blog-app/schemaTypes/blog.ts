import { title } from "process";

export default{
    name:'blog',
    type:'document',
    title:'Blog',
    fields:[
        {
        name:'title',
        type:'string',
        title:'Title of blog article',

    },
{
    // https://example.com/posts/what-is-a-slug

        name:'slug',
        type:'slug',
        title:'Slug of your blog article',
        options:{
            source:'title'  
            // wanted to generate tilte on the basis of title 
        }
    },
    {
        name:'titleImage',
        type:'image',
        title:'Title Image',
    },
    {
        
            name:'smallDescription',
            type:'text',
            title:'Small Description',
       
    },
    {
        
        name:'content',
        type:'array',
        title:'Content',
        of:[
            {
                type:'block'
            }
        ]
   
},
]

}