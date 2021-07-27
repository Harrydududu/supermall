<template>
	<div>
		<scroll class="content" ref="scroll" :probe-type='0'>
			<!-- <h2>
				{{$store.state.cartList[0].checked}}
			</h2> -->
			<div>
				{{counter}}
				<button @click="add">+</button>
				<button @click="sub">-</button>
			</div>
			<ul>
				<li>profile1</li>
				<li>profile2</li>
				<li>profile3</li>
				<li>profile4</li>
				<li>profile5</li>
				<li>profile6</li>
				<li>profile7</li>
				<li>profile8</li>
				<li>profile9</li>
				<li>profile10</li>
				<li>profile11</li>
				<li>profile12</li>
				<li>profile13</li>
				<li>profile14</li>
				<li>profile15</li>
				<li>profile16</li>
				<li>profile17</li>
				<li>profile18</li>
				<li>profile19</li>
				<li>profile20</li>
				<li>profile21</li>
				<li>profile22</li>
				<li>profile23</li>
				<li>profile24</li>
				<li>profile25</li>
				<li>profile26</li>
				<li>profile27</li>
				<li>profile28</li>
				<li>profile29</li>
				<li>profile30</li>
				<li>profile31</li>
				<li>profile32</li>
				<li>profile33</li>
				<li>profile34</li>
				<li>profile35</li>
				<li>profile36</li>
				<li>profile37</li>
				<li>profile38</li>
				<li>profile39</li>
				<li>profile40</li>
				<li>profile41</li>
				<li>profile42</li>
				<li>profile43</li>
				<li>profile44</li>
				<li>profile45</li>
				<li>profile46</li>
				<li>profile47</li>
				<li>profile48</li>
				<li>profile49</li>
				<li>profile50</li>
			</ul>
		</scroll>
	</div>
</template>

<script type="text/javascript">

import Scroll from "components/common/scroll/Scroll";


	export default{
		name:'Profile',
		components: {
			Scroll
		},
		data() {
			return {
				counter: 0
			}
		},
		methods: {
			add() {
				this.counter += 1
			},
			sub() {
				this.counter -= 1
			}
		},
		activated() {
			this.$forceUpdate();
		}
	}
</script>

<style scoped>
	.content {
		height: 300px;
		background-color: #bf4;
		overflow: hidden;
	}
</style>