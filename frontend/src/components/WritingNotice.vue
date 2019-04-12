<template>
  <div>
    <md-field :class="messageClass">
      <label>제목</label>
      <md-input v-model="title" required></md-input>
      <span class="md-error">제목을 입력해주세요.</span>
    </md-field>

    <md-field :class="messageClass">
      <label>내용</label>
      <md-textarea v-model="textarea" required></md-textarea>
      <span class="md-helper-text">공지할 내용을 입력해주세요.</span>
      <span class="md-error">내용을 입력해주세요.</span>
    </md-field>

    <md-switch v-model="hasMessages">{{ !hasMessages ? 'Show' : 'Hide' }} Errors</md-switch>
  </div>
</template>

<script>
  export default {
    name: 'ErrorsMessages',
    data: () => ({
      title: null,
      // required: null,
      textarea: null,
      hasMessages: false
    }),
    computed: {
      messageClass () {
        return {
          'md-invalid': this.hasMessages
        }
      }
    }
  }
</script>