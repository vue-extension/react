<script lang="tsx">
import { Vue, Component, Prop } from "vue-property-decorator";
 
@Component({ components: {  } })
export default class Tsx extends Vue {
  text = "[1,2,3]";
  className = "page ";
  display = true;
  render() {
    return <div className={this.className}>{this.text}</div>;
  }
}
</script>
