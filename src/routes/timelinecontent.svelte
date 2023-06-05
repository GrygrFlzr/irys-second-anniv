<script>
    export let data = [
  {
    date: 'placeholder1',
    title: 'placeholder2',
    photo: '',
    content: 'placeholder3'
  }, 
]
</script>

<section class="timeline">
    {#each data as item, i}
        <div class="timeline-item" id="{i}_id">
            <div class="timeline-extra">
                <h2>{item.title}</h2>
                <h3>{item.date}</h3>
                <p>{item.content}</p>
            </div>
        </div>
        <div>
            <img class="image" src="{item.photo}" alt="some test about IRyS" />
        </div>

    {/each}
  
  </section>

<!-- Reference from https://www.youtube.com/watch?v=TcYSRI1JFQE -->

<style>
.image{
    width:auto;
    height:150px;
    margin: auto 50px;
    border-style: solid; 
    border-width: 2px;
    border-color: grey;
    border-radius: 30px;
    float: right;
}
/* Line for the timeline      border-left: 2px solid #ccc;  */
.timeline{
    margin: 50px 10px 50px 200px  ;
    padding: 0 20px 0 30px;

}
.timeline-item{
    background-color: #f96fe2;
    padding: 20px 25px;
    font-size: 16px;
    border-radius: 50px;
    position:relative;
    height: auto;
    max-width: 800px;
    margin-bottom: 100px;
}
/* Dot beside the timeline 
.timeline-item::before{
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #000;
    border: 3px solid #ddd;
    position:absolute;
    left: -39px;
}*/
.timeline-extra{
    margin: 10px;
    padding: 20px;
    color: #59084a;
}

div{
    display: inline-block;
}
div h2{
    margin: 10px;
    text-transform: uppercase;
    font-family: Arial, Helvetica, sans-serif;
}
div h3{
    margin: 10px;
    font-family: poppins;
}
div p{
    margin: 0;
    font-family: poppins;
    padding: 10px 0px;
}
</style>