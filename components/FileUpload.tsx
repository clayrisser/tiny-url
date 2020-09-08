import React, { FC } from 'react';
import { Button, ButtonProps } from '@material-ui/core';

export interface FileUploadProps extends Omit<ButtonProps, 'onChange'> {
  onChange: (files: FileList) => any;
}

const FileUpload: FC<FileUploadProps> = (props: FileUploadProps) => {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (props.onChange) props.onChange(e.target.files);
  }

  const buttonProps = ({ ...props } as unknown) as ButtonProps;
  delete buttonProps.onChange;

  return (
    <>
      <input
        id="contained-button-file"
        onChange={handleChange}
        style={{ display: 'none' }}
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          color="primary"
          component="span"
          {...buttonProps}
        >
          {props.children || 'Upload'}
        </Button>
      </label>
    </>
  );
};

FileUpload.defaultProps = {};

export default FileUpload;
