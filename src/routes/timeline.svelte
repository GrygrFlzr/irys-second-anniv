<script>
    export let data = [
        {
            date: 'placeholder1',
            title: 'placeholder2',
            photo: '',
            content: 'placeholder3'
        } 
    ]
    /**
   * @param {string} id
   */
    function scrolltoElement(id){
        const element = document.getElementById(id);
        element?.scrollIntoView({behavior: "smooth"});
    }
</script>

<div class="sidebar">
    <div class="wrapper">
        <div class="links">
            {#each data as content, i}
                <div class="content-jump">
                    <button on:click={() => scrolltoElement(`${i}_id`)}>{content.title}</button>
                </div>
            {/each}
        </div>
    </div>
</div>


<!-- Reference https://www.youtube.com/watch?v=BHskAsXVey8 -->
<style>
    * {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
    }
    .sidebar{
        position: sticky;
        float:left;
        top: 0px;
        left: 0px;
        margin: 25px 0px 0px 15px;
        width: 25px;
        border-left: 2px solid #ccc;
        background: #600150;
        overflow: hidden;
        transition: all 500ms ease-in-out;
    }
    .sidebar:hover{
        width:100px;
    }
    .sidebar .wrapper{
        width:100px;
        height: 100%;
    }
    .sidebar .links{
        padding: 0px 0px;
    }
    .sidebar .links .content-jump{
        margin: 8px 0px;
        height: 50px;
        color: #888;
        display:flex;
        align-items: center;
        padding:0px 12px;
        border-radius: 5px;
        transition: all 300ms ease-in-out;
    }
    /*.sidebar .links .content-jump img{
        display: inline-block;
        width: 18px;
        height: 18px;
    }*/
    .sidebar .links .content-jump button{
        display: inline-block;
        font-size:15px;
        margin-left: 20px;
        background-color: transparent;
        border:none;
        width: 50px;
        color:#888;
    }
    .sidebar .links .content-jump:hover{
        background:#116116;
        cursor:pointer;
    }
    .sidebar .links .content-jump::before{
        content: '';
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #000;
        border: 3px solid #ddd;
        position:absolute;
        left: -8px;
    }
</style>