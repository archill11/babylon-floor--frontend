{
  state: {
    profilePage: {
      profileData: ,
      postsData: ,
      inputTextForProfilePost: 'ты лох',
    },
    messagesPage: {
      dialogsData: ,
      currDialogData: ,
      inputTextForMessagInCurrDialog: 'раздупляйся',
    },
    sideBar: 
  },
  ChangeTextareaForProfilePost: function(text) {
    store.state.profilePage.inputTextForProfilePost = text
    console.log(store.state.profilePage);
    renderTree()
  },
  ChangeTextareaForMessagInCurrDialog: function(text) {
    store.state.messagesPage.inputTextForMessagInCurrDialog = text
    console.log(store.state.messagesPage);
    renderTree()
  },
  addPost: function() {
    const {postsData, inputTextForProfilePost} = store.state.profilePage
    if ( inputTextForProfilePost.trim() ) {
      const newPost = {
        value: inputTextForProfilePost,
        id: postsData[postsData.length-1].id +1,
        likes: 0,
        src: 'https://static.gazetametro.ru/media/20220227140236/3650fee74eafe0eecdeb4f5b464be2271574230abcabb467377bd0f9c728c43e.png'
      }
      postsData.push(newPost)
      store.ChangeTextareaForProfilePost('')
      renderTree()
    }
  },
  sendMessage: function() {
    const {currDialogData, inputTextForMessagInCurrDialog} = store.state.messagesPage
    if ( inputTextForMessagInCurrDialog.trim() ) {
      const newMes = {
        name: 'You',
        message: inputTextForMessagInCurrDialog,
        src: 'https://static.gazetametro.ru/media/20220227140236/3650fee74eafe0eecdeb4f5b464be2271574230abcabb467377bd0f9c728c43e.png',
        id: currDialogData[currDialogData.length-1].id +1,
      }
      currDialogData.push(newMes)
      store.ChangeTextareaForMessagInCurrDialog('')
      renderTree()
    }
  }


}