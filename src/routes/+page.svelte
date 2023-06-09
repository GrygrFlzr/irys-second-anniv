<script>
	import TimelineContent from './TimelineContent.svelte';
	import Timeline from './Timeline.svelte';
	// Can probably have a different file hold the data / Use the database
	const data = [
		{
			date: 'July 11 2021',
			title: 'Test Title',
			photo: '/img/logo-solid.png',
			content:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque maxime libero consequuntur et error ullam ipsa commodi non rerum labore. Minus, dicta rem. Autem voluptatum tenetur minus molestiae, magni dolorem libero ad quas natus placeat? Amet harum excepturi eaque aspernatur facere mollitia illum facilis saepe fugiat, at qui laborum voluptas! Quos sint blanditiis impedit tempore. Error ullam ipsa mollitia debitis, iusto eius facere fugiat deserunt, illum explicabo quod ratione id a? Rerum amet velit, corporis inventore ratione eveniet iusto iste cum, vitae debitis excepturi dolores nam sit saepe veniam! Aperiam sint dolorum laudantium numquam doloribus voluptatibus cumque quidem distinctio sit.'
		},
		{
			date: 'July 12 2021',
			title: 'Test Title2',
			photo: '/img/favicon.png',
			content:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo explicabo voluptatum ex saepe quidem mollitia quibusdam enim quos nulla doloribus.'
		},
		{
			date: 'July 13 2021',
			title: 'Make it longer1',
			photo: '/img/logo-solid.png',
			content:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque maxime libero consequuntur et error ullam ipsa commodi non rerum labore. Minus, dicta rem. Autem voluptatum tenetur minus molestiae, magni dolorem libero ad quas natus placeat? Amet harum excepturi eaque aspernatur facere mollitia illum facilis saepe fugiat, at qui laborum voluptas! Quos sint blanditiis impedit tempore. Error ullam ipsa mollitia debitis, iusto eius facere fugiat deserunt, illum explicabo quod ratione id a? Rerum amet velit, corporis inventore ratione eveniet iusto iste cum, vitae debitis excepturi dolores nam sit saepe veniam! Aperiam sint dolorum laudantium numquam doloribus voluptatibus cumque quidem distinctio sit.'
		},
		{
			date: 'July 14 2021',
			title: 'Make it longer2',
			photo: '/img/logo-solid.png',
			content:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque maxime libero consequuntur et error ullam ipsa commodi non rerum labore. Minus, dicta rem. Autem voluptatum tenetur minus molestiae, magni dolorem libero ad quas natus placeat? Amet harum excepturi eaque aspernatur facere mollitia illum facilis saepe fugiat, at qui laborum voluptas! Quos sint blanditiis impedit tempore. Error ullam ipsa mollitia debitis, iusto eius facere fugiat deserunt, illum explicabo quod ratione id a? Rerum amet velit, corporis inventore ratione eveniet iusto iste cum, vitae debitis excepturi dolores nam sit saepe veniam! Aperiam sint dolorum laudantium numquam doloribus voluptatibus cumque quidem distinctio sit.'
		},
		{
			date: 'July 15 2021',
			title: 'Make it longer3',
			photo: '/img/logo-solid.png',
			content:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque maxime libero consequuntur et error ullam ipsa commodi non rerum labore. Minus, dicta rem. Autem voluptatum tenetur minus molestiae, magni dolorem libero ad quas natus placeat? Amet harum excepturi eaque aspernatur facere mollitia illum facilis saepe fugiat, at qui laborum voluptas! Quos sint blanditiis impedit tempore. Error ullam ipsa mollitia debitis, iusto eius facere fugiat deserunt, illum explicabo quod ratione id a? Rerum amet velit, corporis inventore ratione eveniet iusto iste cum, vitae debitis excepturi dolores nam sit saepe veniam! Aperiam sint dolorum laudantium numquam doloribus voluptatibus cumque quidem distinctio sit.'
		},
		{
			date: 'July 21 2021',
			title: 'Make it longer4',
			photo: '/img/logo-solid.png',
			content:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque maxime libero consequuntur et error ullam ipsa commodi non rerum labore. Minus, dicta rem. Autem voluptatum tenetur minus molestiae, magni dolorem libero ad quas natus placeat? Amet harum excepturi eaque aspernatur facere mollitia illum facilis saepe fugiat, at qui laborum voluptas! Quos sint blanditiis impedit tempore. Error ullam ipsa mollitia debitis, iusto eius facere fugiat deserunt, illum explicabo quod ratione id a? Rerum amet velit, corporis inventore ratione eveniet iusto iste cum, vitae debitis excepturi dolores nam sit saepe veniam! Aperiam sint dolorum laudantium numquam doloribus voluptatibus cumque quidem distinctio sit.'
		},
		{
			date: 'July 23 2021',
			title: 'Make it longer5',
			photo: '/img/logo-solid.png',
			content:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque maxime libero consequuntur et error ullam ipsa commodi non rerum labore. Minus, dicta rem. Autem voluptatum tenetur minus molestiae, magni dolorem libero ad quas natus placeat? Amet harum excepturi eaque aspernatur facere mollitia illum facilis saepe fugiat, at qui laborum voluptas! Quos sint blanditiis impedit tempore. Error ullam ipsa mollitia debitis, iusto eius facere fugiat deserunt, illum explicabo quod ratione id a? Rerum amet velit, corporis inventore ratione eveniet iusto iste cum, vitae debitis excepturi dolores nam sit saepe veniam! Aperiam sint dolorum laudantium numquam doloribus voluptatibus cumque quidem distinctio sit.'
		},
		{
			date: 'July 27 2021',
			title: 'Make it longer6',
			photo: '/img/logo-solid.png',
			content:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque maxime libero consequuntur et error ullam ipsa commodi non rerum labore. Minus, dicta rem. Autem voluptatum tenetur minus molestiae, magni dolorem libero ad quas natus placeat? Amet harum excepturi eaque aspernatur facere mollitia illum facilis saepe fugiat, at qui laborum voluptas! Quos sint blanditiis impedit tempore. Error ullam ipsa mollitia debitis, iusto eius facere fugiat deserunt, illum explicabo quod ratione id a? Rerum amet velit, corporis inventore ratione eveniet iusto iste cum, vitae debitis excepturi dolores nam sit saepe veniam! Aperiam sint dolorum laudantium numquam doloribus voluptatibus cumque quidem distinctio sit.'
		}
	];
</script>

<div class="content">
	<div class="achievements">
		<h1 class="timeHeader">Achievements/Major Events</h1>
	</div>
	<div>
		<Timeline {data} />
		<TimelineContent {data} />
	</div>
</div>

<style>
	.content {
		background: rgba(0, 0, 0, 0);
		backdrop-filter: blur(5px);
	}
	.achievements {
		background-color: #300029;
		margin: 25px 20px 10px;
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
