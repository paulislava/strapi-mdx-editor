import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { ErrorBoundary } from '../ErrorBoundary';
import { Editor as RawEditor, Fragment, MdxComponents } from '@paulislava/mdx-editor';

import { PLUGIN_ID } from '../../pluginId';
import { InputProps } from '@strapi/strapi/admin';

export type Attribute = {
  type: string;
  writable?: boolean;
  visible?: boolean;
  relation?: string;
  private?: boolean;
  [key: string]: any;
};

type EditorProps = InputProps & {
  value?: string;
  label: string;
  placeholder?: string;
  attribute: Attribute;
  onChange(props: { target: any }): void;
};

let globalFragments: Fragment[] = [];
let fragmentsPromise: Promise<Fragment[]> | null = null;

const getFragments = async () => {
  if (globalFragments.length > 0) {
    return Promise.resolve(globalFragments);
  }

  if (fragmentsPromise) {
    return fragmentsPromise;
  }

  fragmentsPromise = fetch(`/${PLUGIN_ID}/fragments`).then(async (res) => {
    globalFragments = await res.json();
    return globalFragments;
  });

  return fragmentsPromise;
};

let globalComponents: MdxComponents | null = null;
let componentsPromise: Promise<MdxComponents | null> | null = null;

const getComponents = async () => {
  if (globalComponents) {
    return Promise.resolve(globalComponents);
  }

  if (componentsPromise) {
    return componentsPromise;
  }

  componentsPromise = fetch(`/${PLUGIN_ID}/components`)
    .then(async (res) => {
      if (!res.ok) {
        throw new Error('Failed fetching mdx components!');
      }

      const result = await res.json();
      if (typeof result === 'object') {
        globalComponents = result as MdxComponents;
        return globalComponents as MdxComponents;
      } else {
        throw new Error('Incorrect MDX components result!');
      }
    })
    .catch((e) => {
      console.error(e);
      return null;
    });

  return componentsPromise;
};

const Editor: FC<EditorProps> = React.forwardRef<HTMLInputElement, EditorProps>(
  ({ attribute, disabled, label, name, onChange, required, value }, _ref) => {
    const [fragments, setFragments] = useState<Fragment[]>(globalFragments);
    const [components, setComponents] = useState<MdxComponents | null>(globalComponents);

    useEffect(() => {
      getFragments().then(setFragments);
      getComponents().then(setComponents);
    }, []);

    const handleChange = useCallback(
      (e: any) => {
        onChange({
          target: { name, type: attribute.type, value: e.target.value },
        });
      },
      [attribute]
    );

    const fallback = useCallback(() => {
      return (
        <div>
          {label && <label htmlFor={name}>{label}</label>}
          <textarea
            id={name}
            name={name}
            value={value || ''}
            disabled={disabled}
            required={required}
            rows={50}
            onChange={handleChange}
            style={{ width: '100%', minHeight: '400px' }}
          />
        </div>
      );
    }, [name, label, value, disabled, required, handleChange]);

    return (
      <ErrorBoundary fallback={fallback}>
        <RawEditor
          name={name}
          label={label}
          value={value}
          disabled={disabled}
          required={required}
          fragments={fragments}
          onChange={handleChange}
          components={components}
          previewUrl={process.env.STRAPI_ADMIN_MDX_PREVIEW_URL}
        />
      </ErrorBoundary>
    );
  }
);

export default Editor;
