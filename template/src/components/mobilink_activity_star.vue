 <template>
  <div :class="['vue-star-rating', {'vue-star-rating-rtl':rtl}, {'vue-star-rating-inline': inline}]">
    <div @mouseleave="resetRating" class="vue-star-rating" :title="formattedRating">
      <span v-for="n in maxRating" :class="[{'vue-star-rating-pointer': !readOnly }, 'vue-star-rating-star']">
        <star :fill="fillLevel[n-1]" :size="starSize" :star-id="n" :step="step" :active-color="activeColor" :inactive-color="inactiveColor" :border-color="borderColor" :border-width="borderWidth" :padding="padding" @star-selected="setRating($event, mouse_permission)" @star-mouse-move="setRating" :rtl="rtl"></star>
      </span>
    </div>
  </div>
</template>


<script type="text/javascript">
import star from './star.vue'
const COMPONENT_NAME = 'jx-mobilink-star'
export default {
  name: COMPONENT_NAME,
  components: {
    star
  },
  model: {
    prop: 'rating',
    event: 'rating-selected'
  },
  props: {
    increment: {
      type: Number,
      default: 0.2
    },
    rating: {
      type: Number,
      default: 0
    },
    roundStartRating: {
      type: Boolean,
      default: true
    },
    activeColor: {
      type: String,
      default: '#ffd055'
    },
    inactiveColor: {
      type: String,
      default: '#d8d8d8'
    },
    maxRating: {
      type: Number,
      default: 5
    },
    starSize: {
      type: Number,
      default: 25
    },
    showRating: {
      type: Boolean,
      default: true
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    textClass: {
      type: String,
      default: ''
    },
    inline: {
      type: Boolean,
      default: false
    },
    borderColor: {
      type: String,
      default: '#999'
    },
    borderWidth: {
      type: Number,
      default: 0
    },
    padding: {
      type: Number,
      default: 0
    },
    rtl: {
      type: Boolean,
      default: false
    },
    fixedPoints: {
      type: Number,
      default: null
    },
    class_pk: null,
    evaluate: null,
    showStar: {
      type: Boolean,
      default: false
    }
  },
  created () {
    if (this.showStar) {
      this.selectedRating = Number(this.evaluate)
      this.currentRating = this.selectedRating
      this.createStars()
    }
  },
  methods: {
    setRating ($event, persist) {
      if (!this.readOnly && !this.showStar) {
        const position = (this.increment) ? $event.position / 100 : (100 - $event.position) / 100
        this.currentRating = (($event.id + position) - 1).toFixed(2)
        this.currentRating = (this.currentRating > this.maxRating) ? this.maxRating : this.currentRating
        this.createStars()
        if (persist) {
          var vm = this
          vm.selectedRating = vm.currentRating
          var paramsStar = new URLSearchParams()
          paramsStar.append('star', vm.selectedRating)
          window.axios.put(vm.end_point + 'points/' + vm.class_pk,
            paramsStar
          )
            .then(function (response) {
              // var serializable = response.data
              window.showMessageToastr('success', 'Cập nhật thành công')
              // vm.$emit('rating-selected', serializable.okrArchive)
              vm.ratingSelected = true
            })
            .catch(function (error) {
              console.log(error)
              window.showMessageByAPICode(error.response.status, error.response.data)
            })
        } else {
          this.$emit('current-rating', this.currentRating)
        }
      }
    },
    resetRating () {
      if (!this.readOnly) {
        this.currentRating = this.selectedRating
        this.createStars(this.shouldRound)
      }
    },
    createStars (round = true) {
      if (round) {
        this.round()
      }
      for (var i = 0; i < this.maxRating; i++) {
        let level = 0
        if (i < this.currentRating) {
          level = (this.currentRating - i > 1) ? 100 : (this.currentRating - i) * 100
        }
        this.$set(this.fillLevel, i, Math.round(level))
      }
    },
    round () {
      var inv = 1.0 / this.increment
      this.currentRating = Math.min(this.maxRating, Math.ceil(this.currentRating * inv) / inv)
    }
  },
  computed: {
    formattedRating () {
      return (this.fixedPoints === null) ? this.currentRating : this.currentRating.toFixed(this.fixedPoints)
    },
    shouldRound () {
      return this.ratingSelected || this.roundStartRating
    }
  },
  watch: {
    rating (val) {
      this.currentRating = val
      this.selectedRating = val
      this.createStars()
    }
  },
  data () {
    return {
      step: 0,
      fillLevel: [],
      currentRating: 0,
      ratingSelected: false,
      mouse_permission: true,
      selectedRating: 0
    }
  }
}
</script>

<style scoped>
.vue-star-rating-star {
  display: inline-block;
}
.vue-star-rating-pointer {
  cursor: pointer;
}
.vue-star-rating {
  display: flex;
  align-items: center;
}
.vue-star-rating-inline {
  display: inline-flex;
}
.vue-star-rating-rating-text {
  margin-top: 7px;
  margin-left: 7px;
}
.vue-star-rating-rtl {
  direction: rtl;
}
.vue-star-rating-rtl .vue-star-rating-rating-text {
  margin-right: 10px;
  direction:rtl;
}
</style>
