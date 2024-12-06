<script setup lang="ts">
import Button from '../../components/ui/newkit/Button.vue';

</script>

<template>
  <main>
    <h1 className="text-3xl font-bold underline">
      Home!


    </h1>

    <div class="row flex-spaces">
      <div class="alert alert-primary">Alert-primary</div>
      <div class="alert alert-secondary">Alert-secondary</div>
      <div class="alert alert-success">Alert-success</div>
      <div class="alert alert-warning">Alert-warning</div>
      <div class="alert alert-danger">Alert-danger</div>
    </div>

    <h1>Example h1 heading <span class="badge">123</span></h1>
    <h2>Example h2 heading <span class="badge secondary">123</span></h2>
    <h3>Example h3 heading <span class="badge success">123</span></h3>
    <h4>Example h4 heading <span class="badge warning">123</span></h4>
    <h5>Example h5 heading <span class="badge danger">123</span></h5>
    <h6>Example h6 heading <span class="badge">123</span></h6>

    <input type="button" class="paper-btn btn-primary-outline" value="Primary" />
    <input type="button" class="btn-secondary-outline" value="Secondary" />
    <button class="btn-success-outline">Success</button>
    <button class="btn-warning-outline">Warning</button>
    <a href="#" class="paper-btn btn-danger-outline">Danger</a>


    <div class="form-group">
      <label for="paperInputs1">Input</label>
      <input type="text" placeholder="Nice input" id="paperInputs1">
    </div>
    <div class="row">
      <div class="col sm-4">
        <div class="form-group">
          <label for="paperInputs2">Block Level</label>
          <input class="input-block" type="text" id="paperInputs2">
        </div>
      </div>
      <div class="col sm-8">
        <div class="form-group">
          <label for="paperInputs3">Block Level</label>
          <input class="input-block" type="text" id="paperInputs3">
        </div>
      </div>
    </div>
    <div class="form-group">
      <label for="paperInputs4">Disabled</label>
      <input type="text" placeholder="Disabled" id="paperInputs4" disabled>
    </div>
    <div class="form-group">
      <label for="large-input">Large Input</label>
      <textarea id="large-input" placeholder="Large input"></textarea>
    </div>
    <div class="form-group">
      <label for="no-resize">No Resize</label>
      <textarea class="no-resize" id="no-resize" placeholder="No resize"></textarea>
    </div>
    <div class="form-group">
      <label for="paperSelects1">Select</label>
      <select id="paperSelects1">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </select>
    </div>
    <fieldset class="form-group">
      <legend>Some Radio Buttons</legend>
      <label for="paperRadios1" class="paper-radio">
        <input type="radio" name="paperRadios" id="paperRadios1" value="option 1"> <span>This is the first option</span>
      </label>
      <label for="paperRadios2" class="paper-radio">
        <input type="radio" name="paperRadios" id="paperRadios2" value="option 2"> <span>This is the second
          option</span>
      </label>
    </fieldset>
    <fieldset class="form-group">
      <legend>Some Check Boxes</legend>
      <label for="paperChecks1" class="paper-check">
        <input type="checkbox" name="paperChecks" id="paperChecks1" value="option 1"> <span>This is the first
          check</span>
      </label>
      <label for="paperChecks2" class="paper-check">
        <input type="checkbox" name="paperChecks" id="paperChecks2" value="option 2"> <span>This is the second
          check</span>
      </label>
    </fieldset>
    <fieldset class="form-group">
      <legend>Some Switch</legend>
      <p>Default - standard outline style (square & circle)</p>
      <label class="paper-switch">
        <input id="paperSwitch4" name="paperSwitch4" type="checkbox" />
        <span class="paper-switch-slider"></span>
      </label>
      <label for="paperSwitch4" class="paper-switch-label">
        Square switch
      </label>
    </fieldset>
    <fieldset class="form-group">
      <label for="paperSwitch5" class="paper-switch-label">
        Square switch
      </label>
      <label class="paper-switch">
        <input id="paperSwitch5" name="paperSwitch5" type="checkbox" checked />
        <span class="paper-switch-slider"></span>
      </label>
    </fieldset>
    <fieldset class="form-group">
      <label class="paper-switch">
        <input id="paperSwitch6" name="paperSwitch6" type="checkbox" checked />
        <span class="paper-switch-slider round"></span>
      </label>
      <label for="paperSwitch6" class="paper-switch-label">
        Circle switch
      </label>
    </fieldset>
    <fieldset class="form-group">
      <label for="paperSwitch7" class="paper-switch-label">
        Circle switch
      </label>
      <label class="paper-switch">
        <input id="paperSwitch7" name="paperSwitch7" type="checkbox" />
        <span class="paper-switch-slider round"></span>
      </label>
    </fieldset>
    <fieldset class="form-group">
      <p>Type2 - inline style (square & circle)</p>
      <label class="paper-switch-2">
        <input id="paperSwitch8" name="paperSwitch8" type="checkbox" checked />
        <span class="paper-switch-slider"></span>
      </label>
      <label for="paperSwitch8" class="paper-switch-2-label">
        Square switch
      </label>
    </fieldset>
    <fieldset class="form-group">
      <label for="paperSwitch9" class="paper-switch-2-label">
        Square switch
      </label>
      <label class="paper-switch-2">
        <input id="paperSwitch9" name="paperSwitch9" type="checkbox" />
        <span class="paper-switch-slider"></span>
      </label>
    </fieldset>
    <fieldset class="form-group">
      <label class="paper-switch-2">
        <input id="paperSwitch10" name="paperSwitch10" type="checkbox" />
        <span class="paper-switch-slider round"></span>
      </label>
      <label for="paperSwitch10" class="paper-switch-2-label">
        Circle switch
      </label>
    </fieldset>
    <fieldset class="form-group">
      <label for="paperSwitch11" class="paper-switch-2-label">
        Circle switch
      </label>
      <label class="paper-switch-2">
        <input id="paperSwitch11" name="paperSwitch11" type="checkbox" checked />
        <span class="paper-switch-slider round"></span>
      </label>
    </fieldset>
    <fieldset class="form-group">
      <p>Type3 - Tile style</p>
      <label for="paperSwitch1" class="paper-switch-tile">
        <input id="paperSwitch1" name="paperSwitch1" type="checkbox" />
        <div class="paper-switch-tile-card border">
          <div class="paper-switch-tile-card-front border">Front</div>
          <div class="paper-switch-tile-card-back border background-primary">Back</div>
        </div>
      </label>
      <label for="paperSwitch2" class="paper-switch-tile">
        <input id="paperSwitch2" name="paperSwitch2" type="checkbox" />
        <div class="paper-switch-tile-card border">
          <div class="paper-switch-tile-card-front border background-warning">Off</div>
          <div class="paper-switch-tile-card-back border background-secondary">On</div>
        </div>
      </label>
      <label for="paperSwitch3" class="paper-switch-tile">
        <input id="paperSwitch3" name="paperSwitch3" type="checkbox" />
        <div class="paper-switch-tile-card border">
          <div class="paper-switch-tile-card-front border background-danger">Declined</div>
          <div class="paper-switch-tile-card-back border background-success">Accepted</div>
        </div>
      </label>
    </fieldset>
    <fieldset class="form-group">
      <legend>Sliders</legend>
      <div class="form-group">
        <label for="input-range">Note /10 :</label>
        <input type="range" name="note" id="input-range" min="0" max="10">
      </div>
      <div class="form-group">
        <label for="percentage">Percentage (<code>.input-block</code>) :</label>
        <input class="input-block" type="range" name="percentage" id="percentage" min="0" max="100"
          oninput="output.value = this.value + '%';">
        <output id="output" for="percentage">50%</output>
      </div>
    </fieldset>

    <div class="row flex-spaces child-borders">
      <label class="paper-btn margin" for="modal-1">Open Modal!</label>
    </div>
    <input class="modal-state" id="modal-1" type="checkbox">
    <div class="modal">
      <label class="modal-bg" for="modal-1"></label>
      <div class="modal-body">
        <label class="btn-close" for="modal-1">X</label>
        <h4 class="modal-title">Modal Title</h4>
        <h5 class="modal-subtitle">Modal Subtitle</h5>
        <p class="modal-text">This is an example of modal which is implemented with pure CSS! :D</p>
        <label for="modal-1">Nice!</label>
      </div>
    </div>


    <button popover-top="Popover on top">Popover on top and on a button!</button>

    <div class="row">
      <div class="progress margin-bottom">
        <div class="bar w-25"></div>
      </div>
      <div class="progress margin-bottom">
        <div class="bar secondary w-40"></div>
      </div>
      <div class="progress margin-bottom">
        <div class="bar success w-55"></div>
      </div>
      <div class="progress margin-bottom">
        <div class="bar warning w-70"></div>
      </div>
      <div class="progress margin-bottom">
        <div class="bar danger w-85"></div>
      </div>
      <div class="progress margin-bottom">
        <div class="bar muted w-100"></div>
      </div>
    </div>

    <table class="table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Position</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Bob Dylan</td>
          <td>Musician</td>
          <td>California, USA</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Eric Clapton</td>
          <td>Musician</td>
          <td>Ohio, USA</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Daniel Kahneman</td>
          <td>Psychologist</td>
          <td>California, USA</td>
        </tr>
      </tbody>
    </table>

    <div class="border-primary border-2 border-dashed border-thick">Border primary</div>
    <br>
    <div class="border-primary border-2">Border primary</div>

    <div class="border-primary border-4">Border primary</div>


    <div class="row child-borders">
      <div class="sm-2 col border border-primary">Border primary</div>
      <div class="sm-2 col border border-secondary">Border secondary</div>
      <div class="sm-2 col border border-success">Border success</div>
      <div class="sm-2 col border border-warning">Border warning</div>
      <div class="sm-2 col border border-danger">Border danger</div>
      <div class="sm-2 col border border-white">Border white</div>
    </div>

  </main>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Short+Stack&display=swap');
/* @import url('https://fonts.googleapis.com/css2?family=Short+Stack&display=swap'); */

/* body {
  font-family: 'Short Stack', cursive;
} */
</style>