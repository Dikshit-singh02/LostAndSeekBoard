# TODO

- [x] Fix Post item upload error by updating `Frontend/src/pages/Post.jsx`:
  - [x] Add validation to stop submit and show snackbar if no image selected
  - [x] Ensure file input sends multipart field name `image` (change `name` from `file` to `image`)
- [ ] Re-run frontend post flow and verify backend receives `req.file` and returns 201


