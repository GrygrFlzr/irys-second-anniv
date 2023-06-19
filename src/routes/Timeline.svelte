<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	export let data = [
		{
			date: new Date(),
			title: 'placeholder2',
			photo: '',
			content: 'placeholder3'
		}
	];

	const years = [2021, 2022, 2023];

	// For Lighting up the timeline bubble when item is on screen
	let active = false;
	let border = false;
	if(browser){
		const items = document.querySelectorAll(".timeline-item");
		
		const observer = new IntersectionObserver(entries => {
			entries.forEach((entry) => {
				const currentIndex = Array.prototype.indexOf.call(items, entry.target);
				const timelineBubble = document.getElementById(`content_${currentIndex}`);
				timelineBubble?.classList.toggle("active", entry.isIntersecting);
				
			})
		}, 
		{
			threshold: 0.9
		}
		)
		items.forEach((item, index) => {
			observer.observe(item)
		})
	}
	// For the diamond to move about
	let diamondY = 0;

	$: if (browser){
		const contentYear = document.querySelectorAll(".year-divider");
		const observer2 = new IntersectionObserver(entries => {
			entries.forEach((entry) => {
				if(entry.isIntersecting){
					const currentIndex = Array.prototype.indexOf.call(contentYear, entry.target);

					console.log(entry.boundingClientRect.top + window.pageYOffset);

					diamondY = Math.max(0, (((y - (entry.boundingClientRect.top + window.pageYOffset))  / (entry.boundingClientRect.height)) * 100));
					
				}
			})
		},
		{
			threshold: 0
		})
		contentYear.forEach(year =>{
			observer2.observe(year)
		})
	}

	/**
	 * @type {number}
	 */
	let y = 0;
	let wrapperY = 0;
	let wrapperOffset = 0;
	let scrollHeight = 1;
	let scrollTop = 0;
	let throttling = false;
	let windowInnerHeight = 0;
	
	/**
   * @type {number}
   */
	$: currentYear = years[0];

	$: scrollHeightBelow = scrollHeight - wrapperOffset - 100;
	$: calcOffset = wrapperOffset - windowInnerHeight / 2;
	

	onMount(() => {
		scrollHeight = document.documentElement.scrollHeight;
		scrollTop = document.documentElement.scrollTop;

		window.addEventListener('scroll',function(e){
			for(let i=0; i<years.length; i++){
				var element1 = document.getElementById(`contentyear_${i}`)?.getBoundingClientRect().top;
				try{
					var element2 = document.getElementById(`contentyear_${i+1}`)?.getBoundingClientRect().top;
					if(y > (element1 + this.window.pageYOffset - (windowInnerHeight/1.5)) && y < (element2 + this.window.pageYOffset - (windowInnerHeight/1.5))){
						currentYear = years[i];
					}
					// For the last year
					else if( y > (element1 + this.window.pageYOffset - (windowInnerHeight/1.5)) && typeof element2 === 'undefined'){
						currentYear = years[years.length-1];
					}
				}
				catch{
					currentYear = years[i];
				}
			}
		})
	});

	function handleResize() {
		if (throttling) {
			return;
		}

		throttling = true;
		requestAnimationFrame(() => {
			scrollHeight = document.documentElement.scrollHeight;
			throttling = false;
		});
	}
	/**
	 *
	 * @param {HTMLElement} node
	 */
	function checkSidebarY(node) {
		wrapperY = node.getBoundingClientRect().top + screenY;
	}
</script>

<svelte:window bind:scrollY={y} on:resize={handleResize} bind:innerHeight={windowInnerHeight} />

<div class="sidebar" id="timeline-sidebar">
	<div class="wrapper" use:checkSidebarY>
		<span class="diamond" style:top="calc({diamondY}% + 32px)">&#9830</span>
		{#each years as year, x}
			<div class="year" id="timelineyear_{x}">
				<p>{year}</p>
				<div class="links" class:active>
					{#each data as content, i}
						{#if content.date.getFullYear() === year && content.date.getFullYear() === currentYear}
							<div class="content-jump" class:active class:border id="content_{i}">
								<!--<button on:click={() => scrolltoElement(`${x}_${i}_id`)}>{content.title}</button>-->
							</div>
						{/if}
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>

<!-- Reference https://www.youtube.com/watch?v=BHskAsXVey8 -->
<style>
	.year::before {
		content: '';
		display: block;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background-color: #ddd;
		border: 3px solid #ddd;
		position: absolute;
		left: 0px;
		transition: all 300ms ease-in-out;
	}
	.links{
		transition: all 500ms ease-in-out;
	}
	.year p {
		margin: inherit;
		padding: 5px 0px 0px 15px;
		color: #ddd;
		border-left: 3px solid #ddd;
		transform: translateX(7px);
	}
	/*		border-left: 2px solid #ccc;*/
	.sidebar {
		position: -webkit-sticky; /* for Safari */
		position: sticky;
		float: left;
		top: 150px;
		left: 0px;
		bottom: 0;
		margin: 0 0 0 25px;
		width: 18px;
		padding-top: 25px;

		background: transparent;
		transition: all 500ms ease-in-out;
		z-index: 1000;
	}
	.diamond {
		top: 0px;
		color: #ddd;
		font-size: 32px;
		position: absolute;
		line-height: 1;
	}
	/*.sidebar:hover {
		width: 100px;
	}*/
	.sidebar .wrapper {
		width: 20px;
		height: 100%;
		background-color: transparent;
	}
	.sidebar .links {
		padding: 0px 0px;
	}
	.sidebar .links .content-jump {
		margin: 0px 0px;
		height: 50px;
		color: #888;
		display: flex;
		align-items: center;
		padding: 0px 12px;
		transition: all 300ms ease-in-out;
	}
	/*.sidebar .links .content-jump img{
        display: inline-block;
        width: 18px;
        height: 18px;
    }*/
	/*button {
		display: inline-block;
		font-size: 15px;
		margin-left: 10px;
		background-color: transparent;
		border: none;
		width: 50px;
		color: #e1cbd2;
	}*/
	/*.sidebar .links .content-jump:hover {
		background: transparent;
		cursor: pointer;
	}*/
	.content-jump {
		border-left: 3px solid #ddd;
		padding-left: 6px;
		transform: translateX(7px);
	}
	.content-jump::before {
		content: '';
		background: #e1cbd2;
		width: 0px;
		height: 3px;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 0;
	}
	.content-jump::after {
		content: '';
		display: block;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		/*background-color: #b90b8c;*/
		background-color: #ddd;
		border: 3px solid #ddd;
		position: absolute;
		left: -9px;
	}
	.content-jump.border{
		border-left: 3px solid #b90b8c;
		transition: all 500ms ease-in-out;
	}
	.content-jump.active::after{
		background-color: #b90b8c;
		transition: all 500ms ease-in-out;
	}
	/*.content-jump:hover::before{
        width: 18px;
        transition: all 300ms ease-in-out;
   }*/
	/* Circle shape
    .content-jump::before {
		content: '';
		display: block;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: #000;
		border: 3px solid #ddd;
		position: absolute;
		left: -8px;
	}*/
</style>
