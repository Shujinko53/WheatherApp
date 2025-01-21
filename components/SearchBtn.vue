<template>
	<button class="Search_btn">
		<NuxtIcon name="search" class="Search_btn-icon icon" />
	</button>
</template>

<script>
</script>

<style lang="scss">
.Search_btn {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 3.6rem;
	height: 3.6rem;
	margin-left: auto;
	border-radius: 50%;
	background-color: $gray-100;
	font-size: 1.8rem;
	color: $text-color;
	transition:
		background-color .3s ease,
		color .3s ease,
		opacity .1s ease-in-out;

	.search-icon {
		font-size: 2rem;
	}

	&:hover,
	&:focus {
		background-color: rgba($gray-100, .5);
		color: $white;
	}
}
</style>