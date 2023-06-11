<script>
	import TimelineContent from './timelineContent.svelte';
	import Timeline from './timeline.svelte';
	// Can probably have a different file hold the data / Use the database
	// *IMPORTANT* DATA IS REQUIRED TO BE SORTED BY YEAR/DATE ACCORDINGLY (OTHERWISE IT WIRED AND STUFF)
	const data = [
		{
			year: '2021',
			date: 'July 11',
			title: 'Test Title',
			photo: '/img/bg1.png',
			content:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque maxime libero consequuntur et error ullam ipsa commodi non rerum labore. Minus, dicta rem. Autem voluptatum tenetur minus molestiae, magni dolorem libero ad quas natus placeat? Amet harum excepturi eaque aspernatur facere mollitia illum facilis saepe fugiat, at qui laborum voluptas! Quos sint blanditiis impedit tempore. Error ullam ipsa mollitia debitis, iusto eius facere fugiat deserunt, illum explicabo quod ratione id a? Rerum amet velit, corporis inventore ratione eveniet iusto iste cum, vitae debitis excepturi dolores nam sit saepe veniam! Aperiam sint dolorum laudantium numquam doloribus voluptatibus cumque quidem distinctio sit.'
		},
		{
			year: '2021',
			date: 'July 12 2021',
			title: 'Test Title2',
			photo: '/img/bg2.png',
			content:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo explicabo voluptatum ex saepe quidem mollitia quibusdam enim quos nulla doloribus.'
		},
		{
			year: '2021',
			date: 'July 13',
			title: 'Make it longer1',
			photo: '/img/logo-solid.png',
			content:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque maxime libero consequuntur et error ullam ipsa commodi non rerum labore. Minus, dicta rem. Autem voluptatum tenetur minus molestiae, magni dolorem libero ad quas natus placeat? Amet harum excepturi eaque aspernatur facere mollitia illum facilis saepe fugiat, at qui laborum voluptas! Quos sint blanditiis impedit tempore. Error ullam ipsa mollitia debitis, iusto eius facere fugiat deserunt, illum explicabo quod ratione id a? Rerum amet velit, corporis inventore ratione eveniet iusto iste cum, vitae debitis excepturi dolores nam sit saepe veniam! Aperiam sint dolorum laudantium numquam doloribus voluptatibus cumque quidem distinctio sit.'
		},
		{
			year: '2021',
			date: 'July 14',
			title: 'Make it longer2',
			photo: '/img/logo-solid.png',
			content:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque maxime libero consequuntur et error ullam ipsa commodi non rerum labore. Minus, dicta rem. Autem voluptatum tenetur minus molestiae, magni dolorem libero ad quas natus placeat? Amet harum excepturi eaque aspernatur facere mollitia illum facilis saepe fugiat, at qui laborum voluptas! Quos sint blanditiis impedit tempore. Error ullam ipsa mollitia debitis, iusto eius facere fugiat deserunt, illum explicabo quod ratione id a? Rerum amet velit, corporis inventore ratione eveniet iusto iste cum, vitae debitis excepturi dolores nam sit saepe veniam! Aperiam sint dolorum laudantium numquam doloribus voluptatibus cumque quidem distinctio sit.'
		},
		{
			year: '2022',
			date: 'July 15',
			title: 'Make it longer3',
			photo: '/img/logo-solid.png',
			content:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque maxime libero consequuntur et error ullam ipsa commodi non rerum labore. Minus, dicta rem. Autem voluptatum tenetur minus molestiae, magni dolorem libero ad quas natus placeat? Amet harum excepturi eaque aspernatur facere mollitia illum facilis saepe fugiat, at qui laborum voluptas! Quos sint blanditiis impedit tempore. Error ullam ipsa mollitia debitis, iusto eius facere fugiat deserunt, illum explicabo quod ratione id a? Rerum amet velit, corporis inventore ratione eveniet iusto iste cum, vitae debitis excepturi dolores nam sit saepe veniam! Aperiam sint dolorum laudantium numquam doloribus voluptatibus cumque quidem distinctio sit.'
		},
		{
			year: '2022',
			date: 'July 21',
			title: 'Make it longer4',
			photo: '/img/logo-solid.png',
			content:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque maxime libero consequuntur et error ullam ipsa commodi non rerum labore. Minus, dicta rem. Autem voluptatum tenetur minus molestiae, magni dolorem libero ad quas natus placeat? Amet harum excepturi eaque aspernatur facere mollitia illum facilis saepe fugiat, at qui laborum voluptas! Quos sint blanditiis impedit tempore. Error ullam ipsa mollitia debitis, iusto eius facere fugiat deserunt, illum explicabo quod ratione id a? Rerum amet velit, corporis inventore ratione eveniet iusto iste cum, vitae debitis excepturi dolores nam sit saepe veniam! Aperiam sint dolorum laudantium numquam doloribus voluptatibus cumque quidem distinctio sit.'
		},
		{
			year: '2022',
			date: 'July 23',
			title: 'Make it longer5',
			photo: '/img/logo-solid.png',
			content:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque maxime libero consequuntur et error ullam ipsa commodi non rerum labore. Minus, dicta rem. Autem voluptatum tenetur minus molestiae, magni dolorem libero ad quas natus placeat? Amet harum excepturi eaque aspernatur facere mollitia illum facilis saepe fugiat, at qui laborum voluptas! Quos sint blanditiis impedit tempore. Error ullam ipsa mollitia debitis, iusto eius facere fugiat deserunt, illum explicabo quod ratione id a? Rerum amet velit, corporis inventore ratione eveniet iusto iste cum, vitae debitis excepturi dolores nam sit saepe veniam! Aperiam sint dolorum laudantium numquam doloribus voluptatibus cumque quidem distinctio sit.'
		},
		{
			year: '2022',
			date: 'July 27',
			title: 'Make it longer6',
			photo: '/img/logo-solid.png',
			content:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque maxime libero consequuntur et error ullam ipsa commodi non rerum labore. Minus, dicta rem. Autem voluptatum tenetur minus molestiae, magni dolorem libero ad quas natus placeat? Amet harum excepturi eaque aspernatur facere mollitia illum facilis saepe fugiat, at qui laborum voluptas! Quos sint blanditiis impedit tempore. Error ullam ipsa mollitia debitis, iusto eius facere fugiat deserunt, illum explicabo quod ratione id a? Rerum amet velit, corporis inventore ratione eveniet iusto iste cum, vitae debitis excepturi dolores nam sit saepe veniam! Aperiam sint dolorum laudantium numquam doloribus voluptatibus cumque quidem distinctio sit.'
		},
		{
			year: '2023',
			date: 'July 3',
			title: 'Make it longer7',
			photo: '/img/logo-solid.png',
			content:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque maxime libero consequuntur et error ullam ipsa commodi non rerum labore. Minus, dicta rem. Autem voluptatum tenetur minus molestiae, magni dolorem libero ad quas natus placeat? Amet harum excepturi eaque aspernatur facere mollitia illum facilis saepe fugiat, at qui laborum voluptas! Quos sint blanditiis impedit tempore. Error ullam ipsa mollitia debitis, iusto eius facere fugiat deserunt, illum explicabo quod ratione id a? Rerum amet velit, corporis inventore ratione eveniet iusto iste cum, vitae debitis excepturi dolores nam sit saepe veniam! Aperiam sint dolorum laudantium numquam doloribus voluptatibus cumque quidem distinctio sit.'
		}
	];
</script>

<div class="background-img">
	<div class="content">
		<div class="achievements">
			<h1 class="timeHeader">Achievements/Major Events</h1>
		</div>
		<Timeline {data} />
		<div>
			<TimelineContent {data} />
		</div>
	</div>
</div>

<style>
	.background-img {
		background: #600150;
		background-image: url('/img/timeline-bg.jpg');
		background-repeat: no-repeat;
		background-size: cover;
		background-attachment: fixed;
	}

	.content {
		background: rgba(0, 0, 0, 0);
		backdrop-filter: blur(5px);
		padding-top: 1em;
	}

	.achievements {
		background-color: #300029;
		margin: 0px 20px 10px;
		padding: 15px 15px;
		border-radius: 30px;
	}

	.timeHeader {
		color: #cbcbcb;
		text-align: center;
		margin: auto;
		padding: 15px 15px;
	}
</style>
