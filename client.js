window.__ModuleLoader__.load({
  id: 'dsh-model-selecter',
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

    const React = require('react');
    const ReactDOM = require('react-dom');

    const h = React.createElement;
    const {
      useEffect,
      useCallback,
      useMemo,
      useRef,
      useState,
      useSyncExternalStore,
    } = React;

    /** Dictionary namespace owned by this plugin. */
    const NS = 'model-selecter';
    /** Stable style-tag id (the module can be re-executed by HMR). */
    const STYLE_ID = 'dsh-model-selecter/ModelSelecter.css';

    //#region styles
    const css = `
.dsh-ms-root{position:relative;min-width:0}
.dsh-ms-trigger{box-sizing:border-box;border-radius:var(--dsw-radius-sm);min-width:0;max-width:min(360px,45cqw);height:28px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:none;outline:none;align-items:center;gap:4px;padding:0 4px 0 8px;font-size:13px;font-weight:400;line-height:20px;display:flex}
.dsh-ms-trigger:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}
.dsh-ms-trigger:focus-visible:not([data-selection-focus]){box-shadow:0 0 0 2px var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary))}
.dsh-ms-trigger:disabled{color:var(--dsw-alias-label-dimmed);cursor:default}
.dsh-ms-trigger-label{text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}
.dsh-ms-trigger-effort{text-overflow:ellipsis;white-space:nowrap;min-width:0;color:var(--dsw-alias-label-caption);flex-shrink:1000;overflow:hidden}
.dsh-ms-trigger-icon{display:var(--dsh-composer-model-icon-display,none);flex:none}
.dsh-ms-trigger-label,.dsh-ms-trigger-effort{display:var(--dsh-composer-model-text-display,block)}
.dsh-ms-trigger-chevron{color:var(--dsw-alias-label-caption);flex:none;transition:transform .12s}
.dsh-ms-chevron-open{transform:rotate(180deg)}
.dsh-ms-spinner{box-sizing:border-box;width:14px;height:14px;flex:none;border-radius:50%;border:2px solid var(--dsw-alias-label-caption);border-top-color:transparent;animation:dsh-ms-spin .9s linear infinite}
@keyframes dsh-ms-spin{to{transform:rotate(360deg)}}
.dsh-ms-portal{display:contents}
.dsh-ms-menu{position:fixed;z-index:1100;box-sizing:border-box;width:min(352px,calc(100vw - 24px));display:flex;flex-direction:column;padding:4px;border:0;border-radius:var(--dsw-radius-lg);background:var(--dsw-menu-surface-fill,var(--dsw-alias-bg-layer-1));-webkit-backdrop-filter:var(--dsw-menu-backdrop-filter,none);backdrop-filter:var(--dsw-menu-backdrop-filter,none);box-shadow:var(--dsw-elevation-prominent);color:var(--dsw-alias-label-primary);isolation:isolate;overflow:hidden;--dsw-elevation-stroke-color:var(--dsw-alias-border-l1);--dsh-scrollbar-thumb:var(--dsw-alias-scrollbar-bg-l2);--dsh-scrollbar-thumb-hover:var(--dsw-alias-scrollbar-hover-l2)}
.dsh-ms-menu[data-ms-seat="true"]{background-color:var(--dsw-alias-bg-base,#151517);background-image:linear-gradient(var(--dsw-menu-surface-fill,#43454a73),var(--dsw-menu-surface-fill,#43454a73))}
.dsh-ms-header{padding:8px 10px 4px;color:var(--dsw-alias-label-tertiary);font-size:11px;font-weight:600;line-height:16px;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:none}
.dsh-ms-list{display:flex;flex-direction:column;gap:1px;min-height:0;overflow-y:auto;padding:2px 0}
.dsh-ms-row{box-sizing:border-box;display:flex;align-items:center;gap:8px;width:100%;min-height:34px;padding:4px 8px;border:0;border-radius:var(--dsw-radius-md);background:transparent;color:var(--dsw-alias-label-primary);font-size:13px;line-height:20px;text-align:left;cursor:pointer}
.dsh-ms-row:hover:not(:disabled),.dsh-ms-row:focus-visible{background:var(--dsw-alias-interactive-bg-hover);outline:none}
.dsh-ms-row-selected{background:var(--dsw-alias-interactive-bg-hover)}
.dsh-ms-row:disabled{color:var(--dsw-alias-label-dimmed);cursor:default}
.dsh-ms-row-copy{display:flex;flex-direction:column;flex:1;min-width:0}
.dsh-ms-row-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dsh-ms-row-check{display:flex;flex:0 0 16px;align-items:center;justify-content:center;color:var(--dsw-alias-label-secondary)}
.dsh-ms-effort{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:6px 10px;flex:none}
.dsh-ms-effort-label{flex:none;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:18px}
.dsh-ms-segments{display:inline-flex;flex-wrap:wrap;justify-content:flex-end;gap:2px;padding:2px;border-radius:var(--dsw-radius-md);background:var(--dsw-alias-interactive-bg-hover)}
.dsh-ms-segment{height:24px;padding:0 9px;border:0;border-radius:var(--dsw-radius-sm);background:transparent;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:20px;cursor:pointer}
.dsh-ms-segment:hover:not(:disabled){color:var(--dsw-alias-label-primary)}
.dsh-ms-segment-on{background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);box-shadow:var(--dsw-elevation-soft)}
.dsh-ms-segment:disabled{cursor:default;opacity:.5}
.dsh-ms-segment:focus-visible{outline:2px solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:-2px}
.dsh-ms-hint{padding:2px 10px 8px;color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:16px;flex:none}
.dsh-ms-divider{flex:none;height:0;margin:4px 6px;border-top:.5px solid var(--dsw-alias-border-l2)}
.dsh-ms-more{box-sizing:border-box;display:flex;align-items:center;gap:8px;width:100%;height:34px;padding:0 8px;border:0;border-radius:var(--dsw-radius-md);background:transparent;color:var(--dsw-alias-label-primary);font-size:13px;text-align:left;cursor:pointer;flex:none}
.dsh-ms-more:hover,.dsh-ms-more:focus-visible{background:var(--dsw-alias-interactive-bg-hover);outline:none}
.dsh-ms-more-icon{display:flex;color:var(--dsw-alias-label-secondary)}
.dsh-ms-more-label{flex:1}
.dsh-ms-chevron{flex:none;color:var(--dsw-alias-menu-icon,var(--dsw-alias-label-caption))}
.dsh-ms-pane-head{display:flex;align-items:center;gap:4px;padding:4px 4px 4px 2px;flex:none}
.dsh-ms-back{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border:0;border-radius:var(--dsw-radius-sm);background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer}
.dsh-ms-back:hover,.dsh-ms-back:focus-visible{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary);outline:none}
.dsh-ms-pane-title{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--dsw-alias-label-secondary);font-size:12px;font-weight:500;line-height:18px}
.dsh-ms-provider{box-sizing:border-box;display:flex;align-items:center;gap:8px;width:100%;min-height:42px;padding:4px 8px;border:0;border-radius:var(--dsw-radius-md);background:transparent;color:var(--dsw-alias-label-primary);text-align:left;cursor:pointer}
.dsh-ms-provider:hover,.dsh-ms-provider:focus-visible{background:var(--dsw-alias-interactive-bg-hover);outline:none}
.dsh-ms-provider-copy{display:flex;flex-direction:column;flex:1;min-width:0}
.dsh-ms-provider-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13px;line-height:18px}
.dsh-ms-provider-count{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:15px}
.dsh-ms-provider-check{display:flex;color:var(--dsw-alias-label-secondary)}
.dsh-ms-status{padding:10px;color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}
.dsh-ms-search{display:flex;align-items:center;gap:6px;margin:2px 4px 4px;padding:4px 8px;border-radius:var(--dsw-radius-md);background:var(--dsw-alias-interactive-bg-hover);flex:none}
.dsh-ms-search input{flex:1;min-width:0;border:0;outline:none;background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:12px;line-height:18px;padding:0}
.dsh-ms-search input::placeholder{color:var(--dsw-alias-label-caption)}
.dsh-ms-search-clear{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border:0;border-radius:50%;background:transparent;color:var(--dsw-alias-label-secondary);font-size:14px;line-height:1;cursor:pointer;flex:none}
.dsh-ms-search-clear:hover,.dsh-ms-search-clear:focus-visible{background:var(--dsw-alias-interactive-bg-hover);outline:none}
.dsh-ms-error{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin:2px 4px 4px;padding:6px 8px;border-radius:var(--dsw-radius-md);background:var(--dsw-alias-interactive-bg-hover-danger);color:var(--dsw-alias-state-error-primary);font-size:11px;line-height:16px;flex:none}
.dsh-ms-error button{padding:0;border:0;background:transparent;color:inherit;font:inherit;font-weight:600;cursor:pointer;flex:none}
.dsh-ms-failures{padding:2px 4px 0;flex:none}
.dsh-ms-failure{padding:6px 8px;color:var(--dsw-alias-state-warn-label,var(--dsw-alias-label-tertiary));font-size:11px;line-height:16px}
`;
    if (
      typeof document !== 'undefined' &&
      document.querySelector('style[data-plugin-css=' + JSON.stringify(STYLE_ID) + ']') === null
    ) {
      const tag = document.createElement('style');
      tag.dataset.plugin = 'dsh-model-selecter';
      tag.dataset.pluginCss = STYLE_ID;
      tag.textContent = css;
      document.head.appendChild(tag);
    }
    //#endregion

    //#region dictionaries
    const zh = {
      'provider.account': 'DeepSeek 账号',
      'provider.count': '{count} 个模型',
      'trigger.fallback': '请选择模型',
      'trigger.loading': '正在加载模型…',
      'trigger.selectAria': '请选择模型',
      'trigger.aria': '选择模型，当前 {model}',
      'trigger.ariaEffort': '选择模型，当前 {model}，思考等级 {effort}',
      'menu.aria': '模型与思考等级',
      'menu.providers': '选择服务商',
      'menu.more': '更多模型…',
      'menu.back': '返回',
      'effort.label': '思考',
      'effort.default': '默认',
      'hint.cache':
        '提示：切换模型或思考程度会使已有的提示词缓存失效。建议新建会话，避免额外的 token 消耗。',
      'search.placeholder': '搜索模型…',
      'search.clear': '清除搜索',
      'empty.models': '暂无可用模型',
      'empty.search': '没有匹配的模型。',
      'status.loading': '正在加载模型…',
      'error.action': '模型操作失败：{message}',
      'error.sessionInUse':
        '当前会话已被占用，可能是其他正在运行的 DSH 导致的（如其他 dsh web、桌面端），请退出其他正在运行的 DSH 后重试。',
      'action.reload': '重新加载',
      'warning.groupLoad': '{name} 加载失败：{message}',
    };
    const en = {
      'provider.account': 'DeepSeek Account',
      'provider.count': '{count} models',
      'trigger.fallback': 'Select model',
      'trigger.loading': 'Loading models…',
      'trigger.selectAria': 'Select model',
      'trigger.aria': 'Select model, current {model}',
      'trigger.ariaEffort': 'Select model, current {model}, thinking level {effort}',
      'menu.aria': 'Model and thinking level',
      'menu.providers': 'Choose a provider',
      'menu.more': 'More models…',
      'menu.back': 'Back',
      'effort.label': 'Thinking',
      'effort.default': 'Default',
      'hint.cache':
        'Tip: switching the model or thinking level invalidates the existing prompt cache. Start a new session to avoid extra token usage.',
      'search.placeholder': 'Search models…',
      'search.clear': 'Clear search',
      'empty.models': 'No models available.',
      'empty.search': 'No matching models.',
      'status.loading': 'Loading models…',
      'error.action': 'Model operation failed: {message}',
      'error.sessionInUse':
        'This session is already in use, possibly by another running DSH instance (such as dsh web or the desktop app). Quit other running DSH instances and try again.',
      'action.reload': 'Reload',
      'warning.groupLoad': '{name} failed to load: {message}',
    };
    //#endregion

    //#region helpers
    const cx = (...parts) => parts.filter(Boolean).join(' ');

    /**
     * Provider display order: the account surface first, the official provider
     * second, every other configured provider in catalog order.
     */
    const providerRank = (id) =>
      id === 'deepseek-account' ? 0 : id === 'deepseek-official' ? 1 : 2;

    const providerName = (group, t) =>
      group.id === 'deepseek-account' ? t('provider.account') : group.name;

    const isSameSelection = (selection, provider, model) =>
      selection !== null &&
      selection !== undefined &&
      selection.provider === provider &&
      selection.model === model;

    function Icon({ size = 16, className, children }) {
      return h(
        'svg',
        {
          width: size,
          height: size,
          viewBox: '0 0 16 16',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.5,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          'aria-hidden': true,
          focusable: 'false',
          className,
        },
        children,
      );
    }
    const ChevronDown = (props) => h(Icon, props, h('path', { d: 'M4 6.5L8 10.5L12 6.5' }));
    const ChevronRight = (props) => h(Icon, props, h('path', { d: 'M6.5 4L10.5 8L6.5 12' }));
    const ChevronLeft = (props) => h(Icon, props, h('path', { d: 'M9.5 4L5.5 8L9.5 12' }));
    const CheckIcon = (props) => h(Icon, props, h('path', { d: 'M3 8.5L6.2 11.5L13 4.5' }));
    const MenuIcon = (props) =>
      h(Icon, props, [
        h('path', { key: 'top', d: 'M3 5H13' }),
        h('path', { key: 'middle', d: 'M3 8H13' }),
        h('path', { key: 'bottom', d: 'M3 11H13' }),
      ]);
    const DataIcon = (props) =>
      h(Icon, props, [
        h('ellipse', { key: 'top', cx: 8, cy: 4, rx: 4.5, ry: 2 }),
        h('path', {
          key: 'body',
          d: 'M3.5 4V12C3.5 13.1 5.5 14 8 14C10.5 14 12.5 13.1 12.5 12V4',
        }),
        h('path', {
          key: 'middle',
          d: 'M3.5 8C3.5 9.1 5.5 10 8 10C10.5 10 12.5 9.1 12.5 8',
        }),
      ]);
    const Spinner = () => h('span', { className: 'dsh-ms-spinner', 'aria-hidden': true });

    /**
     * Render a model name through the shared inline-label slot so provider
     * decorations (for example a release badge) keep working inside this menu.
     */
    function modelLabel(renderSlot, group, model, placement, selected, fallback) {
      if (typeof renderSlot !== 'function') return fallback;
      return renderSlot(
        'conversation.input.model.label',
        { provider: { id: group.id, name: group.name }, model, placement, selected },
        { fallback },
      );
    }

    function ModelRow({ group, model, selected, pending, disabled, onChoose, renderSlot, t }) {
      const rowPending = isSameSelection(pending, group.id, model.id);
      return h(
        'button',
        {
          type: 'button',
          role: 'menuitemradio',
          'aria-checked': selected,
          'data-ms-current': selected ? 'true' : undefined,
          className: cx('dsh-ms-row', selected && 'dsh-ms-row-selected'),
          disabled,
          title: model.name,
          onClick: onChoose,
        },
        h(
          'span',
          { className: 'dsh-ms-row-copy' },
          h(
            'span',
            {
              className: 'dsh-ms-row-name',
              'data-provider-id': group.id,
              'data-model-id': model.id,
            },
            modelLabel(renderSlot, group, model, 'option', selected, model.name),
          ),
        ),
        h(
          'span',
          { className: 'dsh-ms-row-check' },
          rowPending ? h(Spinner) : selected ? h(CheckIcon) : null,
        ),
      );
    }

    function ProviderRow({ group, currentProvider, onOpen, t }) {
      return h(
        'button',
        {
          type: 'button',
          role: 'menuitem',
          className: 'dsh-ms-provider',
          'data-ms-current': currentProvider ? 'true' : undefined,
          onClick: onOpen,
        },
        h(
          'span',
          { className: 'dsh-ms-provider-copy' },
          h('span', { className: 'dsh-ms-provider-name' }, group.name),
          h(
            'span',
            { className: 'dsh-ms-provider-count' },
            t('provider.count', { count: group.models.length }),
          ),
        ),
        currentProvider ? h('span', { className: 'dsh-ms-provider-check' }, h(CheckIcon)) : null,
        h(ChevronRight, { className: 'dsh-ms-chevron' }),
      );
    }
    //#endregion

    //#region ModelSelecter
    /**
     * Nearest ancestor that travels with the scrolling conversation: the
     * composer seat (sticky in an active session, absolute in the overlay
     * layout). A menu portaled into it moves with the composer during native
     * overscroll, instead of staying pinned to the viewport.
     */
    function findSeat(element) {
      let node = element?.parentElement ?? null;
      while (node !== null && node !== document.body) {
        const position = getComputedStyle(node).position;
        if (position === 'sticky' || position === 'absolute') return node;
        node = node.parentElement;
      }
      return null;
    }

    /** Viewport top of the nearest scrolling ancestor, used to cap the menu. */
    function findClipTop(element) {
      let node = element?.parentElement ?? null;
      while (node !== null && node !== document.body) {
        const overflowY = getComputedStyle(node).overflowY;
        if (overflowY === 'auto' || overflowY === 'scroll') {
          return node.getBoundingClientRect().top;
        }
        node = node.parentElement;
      }
      return 0;
    }

    /**
     * Composer model seat with provider-first navigation:
     * root = current provider + thinking level + "More models…",
     * providers = every configured provider,
     * models = one provider's catalog (searchable when it is long).
     */
    function ModelSelecter({ locked, available, directory, load, select, t, renderSlot }) {
      const state = useSyncExternalStore(
        (listener) => directory.subscribe(listener),
        () => directory.getSnapshot(),
      );

      const [open, setOpen] = useState(false);
      const [pane, setPane] = useState('root');
      const [providerId, setProviderId] = useState(null);
      const [query, setQuery] = useState('');
      const [actionError, setActionError] = useState(null);
      const [selectionFocus, setSelectionFocus] = useState(false);
      const [anchor, setAnchor] = useState(null);

      const rootRef = useRef(null);
      const triggerRef = useRef(null);
      const searchRef = useRef(null);
      const menuRef = useRef(null);
      const seatRef = useRef(null);
      const portalRef = useRef(null);

      const groups = useMemo(() => {
        const sorted = state.groups
          .slice()
          .sort((left, right) => providerRank(left.id) - providerRank(right.id));
        return sorted.map((group) => ({
          id: group.id,
          name: providerName(group, t),
          models: group.models,
        }));
      }, [state.groups, t]);

      const current = state.current;
      const currentGroup =
        current === null ? null : groups.find((group) => group.id === current.provider) ?? null;
      const currentModel =
        currentGroup === null || current === null
          ? null
          : currentGroup.models.find((model) => model.id === current.model) ?? null;
      const rootGroup = currentGroup ?? groups[0] ?? null;

      const pending = state.pending;
      const busy = pending !== null;
      const reasoning = currentModel?.reasoning;
      const efforts = useMemo(() => {
        if (reasoning === undefined) return [];
        const list = [];
        if (reasoning.defaultEffort === undefined) {
          list.push({ key: 'default', effort: undefined, name: t('effort.default') });
        }
        for (const effort of reasoning.efforts) {
          list.push({ key: effort.id, effort: effort.id, name: effort.name });
        }
        return list;
      }, [reasoning, t]);
      const effectiveEffort = current?.reasoningEffort ?? reasoning?.defaultEffort;
      const effortLabel = useMemo(() => {
        if (currentModel === null) return undefined;
        if (reasoning === undefined) return state.retainedEffort;
        if (effectiveEffort === undefined) return t('effort.default');
        return (
          reasoning.efforts.find((effort) => effort.id === effectiveEffort)?.name ??
          state.retainedEffort ??
          effectiveEffort
        );
      }, [currentModel, reasoning, effectiveEffort, state.retainedEffort, t]);

      const filteredModels = useMemo(() => {
        if (pane !== 'models' || providerId === null) return [];
        const group = groups.find((candidate) => candidate.id === providerId);
        if (group === undefined) return [];
        const needle = query.trim().toLowerCase();
        if (needle === '') return group.models;
        return group.models.filter((model) => model.name.toLowerCase().includes(needle));
      }, [pane, providerId, groups, query]);
      const selectedGroup =
        providerId === null ? null : groups.find((group) => group.id === providerId) ?? null;

      const place = useCallback(() => {
        const rect = triggerRef.current?.getBoundingClientRect();
        if (rect === undefined) return;
        const seat = seatRef.current ?? findSeat(triggerRef.current);
        seatRef.current = seat;
        const margin = 12;
        let right;
        let bottom;
        let maxHeight;
        if (seat === null) {
          right = Math.max(margin, window.innerWidth - rect.right);
          bottom = Math.max(margin, window.innerHeight - rect.top + 8);
          maxHeight = Math.min(460, Math.max(220, rect.top - 24));
        } else {
          const seatRect = seat.getBoundingClientRect();
          right = Math.max(margin, seatRect.right - rect.right);
          bottom = Math.max(margin, seatRect.bottom - rect.top + 8);
          maxHeight = Math.min(460, Math.max(160, rect.top - findClipTop(seat) - 12));
        }
        setAnchor((previous) => {
          if (
            previous !== null &&
            previous.seat === seat &&
            previous.right === right &&
            previous.bottom === bottom &&
            previous.maxHeight === maxHeight
          ) {
            return previous;
          }
          return { seat, right, bottom, maxHeight };
        });
      }, []);

      useEffect(() => {
        if (!open) return undefined;
        place();
        const update = () => place();
        window.addEventListener('resize', update);
        const viewport = window.visualViewport;
        viewport?.addEventListener('scroll', update);
        viewport?.addEventListener('resize', update);
        // In seat mode the menu moves with the composer by layout; only the
        // composer's own size and window resizes can still change the anchor.
        if (anchor?.seat == null) {
          window.addEventListener('scroll', update, true);
        }
        const observer =
          typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(update);
        if (observer !== null) {
          if (triggerRef.current !== null) observer.observe(triggerRef.current);
          if (anchor?.seat != null) observer.observe(anchor.seat);
        }
        return () => {
          window.removeEventListener('resize', update);
          viewport?.removeEventListener('scroll', update);
          viewport?.removeEventListener('resize', update);
          window.removeEventListener('scroll', update, true);
          observer?.disconnect();
        };
      }, [open, pane, anchor?.seat, place]);

      useEffect(() => {
        if (open) return undefined;
        const host = portalRef.current;
        if (host !== null) {
          host.remove();
          portalRef.current = null;
        }
        return undefined;
      }, [open]);

      useEffect(
        () => () => {
          portalRef.current?.remove();
        },
        [],
      );

      useEffect(() => {
        if (!open) return undefined;
        const closeOutside = (event) => {
          const target = event.target;
          if (!(target instanceof Node)) return;
          if (rootRef.current?.contains(target) === true) return;
          if (menuRef.current?.contains(target) === true) return;
          setOpen(false);
          setPane('root');
          setQuery('');
        };
        document.addEventListener('mousedown', closeOutside);
        return () => document.removeEventListener('mousedown', closeOutside);
      }, [open]);

      useEffect(() => {
        if (!open) return;
        if (pane === 'models' && (selectedGroup?.models.length ?? 0) > 6) {
          searchRef.current?.focus();
          return;
        }
        const menu = menuRef.current;
        if (menu === null) return;
        const target =
          menu.querySelector('[data-ms-current="true"]:not(:disabled)') ??
          menu.querySelector('button:not(:disabled)');
        target?.focus?.();
      }, [open, pane, providerId]);

      if (!available) return null;

      const closeMenu = (restoreFocus) => {
        setOpen(false);
        setPane('root');
        setQuery('');
        setActionError(null);
        if (restoreFocus) {
          queueMicrotask(() => triggerRef.current?.focus());
        }
      };

      const openMenu = () => {
        const seat = findSeat(triggerRef.current);
        seatRef.current = seat;
        if (seat === null) {
          portalRef.current?.remove();
        } else {
          if (portalRef.current === null) {
            portalRef.current = document.createElement('div');
            portalRef.current.className = 'dsh-ms-portal';
          }
          if (portalRef.current.parentNode !== seat) seat.appendChild(portalRef.current);
        }
        setActionError(null);
        setSelectionFocus(false);
        setQuery('');
        setPane(currentModel === null ? 'providers' : 'root');
        place();
        setOpen(true);
        load();
      };

      const submit = (selection, done) => {
        setActionError(null);
        select(selection)
          .then((result) => {
            if (result === undefined) return;
            if (result.ok) {
              done?.();
              return;
            }
            const { error } = result;
            setActionError(
              error.code === 'session/writer-held'
                ? t('error.sessionInUse')
                : t('error.action', { message: `${error.code}: ${error.message}` }),
            );
          })
          .catch((error) => {
            setActionError(
              t('error.action', {
                message: error instanceof Error ? error.message : String(error),
              }),
            );
          });
      };

      const chooseModel = (group, model, fromDrill) => {
        if (busy) return;
        if (isSameSelection(current, group.id, model.id)) {
          if (fromDrill) {
            setPane('root');
            setSelectionFocus(true);
          } else {
            setSelectionFocus(true);
            closeMenu(true);
          }
          return;
        }
        submit({ provider: group.id, model: model.id }, () => {
          setSelectionFocus(true);
          if (fromDrill) {
            setPane('root');
          } else {
            closeMenu(true);
          }
        });
      };

      const chooseEffort = (effort) => {
        if (busy || current === null) return;
        if (effectiveEffort === effort) return;
        submit({
          provider: current.provider,
          model: current.model,
          ...(effort === undefined ? {} : { reasoningEffort: effort }),
        });
      };

      const moveFocus = (offset) => {
        const menu = menuRef.current;
        if (menu === null) return;
        const items = Array.from(menu.querySelectorAll('button:not(:disabled)'));
        if (items.length === 0) return;
        const active = items.indexOf(document.activeElement);
        const next =
          active === -1
            ? offset > 0
              ? 0
              : items.length - 1
            : (active + offset + items.length) % items.length;
        items[next].focus();
      };

      const onKeyDown = (event) => {
        if (event.nativeEvent?.isComposing) return;
        if (!open) return;
        if (event.key === 'Escape') {
          event.preventDefault();
          if (pane !== 'root') {
            setPane(pane === 'models' ? 'providers' : 'root');
            setQuery('');
            return;
          }
          setSelectionFocus(false);
          closeMenu(true);
          return;
        }
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          if (event.target instanceof HTMLInputElement) return;
          event.preventDefault();
          moveFocus(event.key === 'ArrowDown' ? 1 : -1);
        }
      };

      const onBlur = (event) => {
        const next = event.relatedTarget;
        if (
          next instanceof Node &&
          (rootRef.current?.contains(next) === true || menuRef.current?.contains(next) === true)
        ) {
          return;
        }
        closeMenu(false);
      };

      const waiting = current === null && state.status === 'loading';
      const triggerText =
        currentModel === null
          ? waiting
            ? t('trigger.loading')
            : t('trigger.fallback')
          : modelLabel(
              renderSlot,
              currentGroup,
              currentModel,
              'trigger',
              true,
              currentModel.name,
            );
      const triggerTitle =
        currentModel === null
          ? waiting
            ? t('trigger.loading')
            : t('trigger.fallback')
          : effortLabel === undefined
            ? currentModel.name
            : `${currentModel.name} · ${effortLabel}`;
      const triggerAria =
        currentModel === null
          ? waiting
            ? t('trigger.loading')
            : t('trigger.selectAria')
          : effortLabel === undefined
            ? t('trigger.aria', { model: currentModel.name })
            : t('trigger.ariaEffort', { model: currentModel.name, effort: effortLabel });

      const menuContent = [];
      const errorText =
        actionError ?? (state.error !== null ? t('error.action', { message: state.error }) : null);
      if (errorText !== null) {
        menuContent.push(
          h(
            'div',
            { key: 'error', className: 'dsh-ms-error', role: 'alert' },
            h('span', null, errorText),
            h(
              'button',
              {
                type: 'button',
                onClick: () => {
                  setActionError(null);
                  load();
                },
              },
              t('action.reload'),
            ),
          ),
        );
      }

      if (pane === 'root') {
        if (rootGroup !== null) {
          menuContent.push(
            h('div', { key: 'header', className: 'dsh-ms-header' }, rootGroup.name),
          );
        }
        menuContent.push(
          rootGroup === null
            ? h(
                'div',
                { key: 'status', className: 'dsh-ms-status', role: 'status' },
                state.status === 'loading' ? t('status.loading') : t('empty.models'),
              )
            : h(
                'div',
                {
                  key: 'models',
                  className: 'dsh-ms-list',
                  role: 'group',
                  'aria-label': rootGroup.name,
                },
                rootGroup.models.length === 0
                  ? h(
                      'div',
                      { className: 'dsh-ms-status', role: 'status' },
                      t('empty.models'),
                    )
                  : rootGroup.models.map((model) =>
                      h(ModelRow, {
                        key: model.id,
                        group: rootGroup,
                        model,
                        selected: isSameSelection(current, rootGroup.id, model.id),
                        pending,
                        disabled: busy,
                        onChoose: () => chooseModel(rootGroup, model, false),
                        renderSlot,
                        t,
                      }),
                    ),
              ),
        );
        if (reasoning !== undefined && efforts.length > 0) {
          menuContent.push(
            h(
              'div',
              { key: 'effort', className: 'dsh-ms-effort' },
              h('span', { className: 'dsh-ms-effort-label' }, t('effort.label')),
              h(
                'div',
                { className: 'dsh-ms-segments', role: 'group', 'aria-label': t('effort.label') },
                efforts.map((choice) =>
                  h(
                    'button',
                    {
                      key: choice.key,
                      type: 'button',
                      role: 'menuitemradio',
                      'aria-checked': effectiveEffort === choice.effort,
                      className: cx(
                        'dsh-ms-segment',
                        effectiveEffort === choice.effort && 'dsh-ms-segment-on',
                      ),
                      disabled: busy,
                      onClick: () => chooseEffort(choice.effort),
                    },
                    choice.name,
                  ),
                ),
              ),
            ),
          );
        }
        if (reasoning !== undefined) {
          menuContent.push(
            h('div', { key: 'hint', className: 'dsh-ms-hint' }, t('hint.cache')),
          );
        }
        menuContent.push(
          h('div', { key: 'divider', className: 'dsh-ms-divider', role: 'separator' }),
          h(
            'button',
            {
              key: 'more',
              type: 'button',
              role: 'menuitem',
              className: 'dsh-ms-more',
              onClick: () => {
                setQuery('');
                setProviderId(null);
                setPane('providers');
              },
            },
            h('span', { className: 'dsh-ms-more-icon' }, h(MenuIcon)),
            h('span', { className: 'dsh-ms-more-label' }, t('menu.more')),
            h(ChevronRight, { className: 'dsh-ms-chevron' }),
          ),
        );
      } else if (pane === 'providers') {
        menuContent.push(
          h(
            'div',
            { key: 'head', className: 'dsh-ms-pane-head' },
            h(
              'button',
              {
                type: 'button',
                className: 'dsh-ms-back',
                'aria-label': t('menu.back'),
                onClick: () => {
                  setPane('root');
                  setQuery('');
                },
              },
              h(ChevronLeft),
            ),
            h('span', { className: 'dsh-ms-pane-title' }, t('menu.providers')),
          ),
          h(
            'div',
            {
              key: 'providers',
              className: 'dsh-ms-list',
              role: 'group',
              'aria-label': t('menu.providers'),
            },
            groups.length === 0
              ? h(
                  'div',
                  { className: 'dsh-ms-status', role: 'status' },
                  state.status === 'loading' ? t('status.loading') : t('empty.models'),
                )
              : groups.map((group) =>
                  h(ProviderRow, {
                    key: group.id,
                    group,
                    currentProvider:
                      current !== null && current.provider === group.id,
                    onOpen: () => {
                      setQuery('');
                      setProviderId(group.id);
                      setPane('models');
                    },
                    t,
                  }),
                ),
          ),
        );
        if (state.failures.length > 0) {
          menuContent.push(
            h(
              'div',
              { key: 'failures', className: 'dsh-ms-failures' },
              state.failures.map((failure) =>
                h(
                  'div',
                  { key: failure.id, className: 'dsh-ms-failure' },
                  t('warning.groupLoad', {
                    name:
                      failure.id === 'deepseek-account'
                        ? t('provider.account')
                        : failure.name,
                    message: failure.message,
                  }),
                ),
              ),
            ),
          );
        }
      } else {
        menuContent.push(
          h(
            'div',
            { key: 'head', className: 'dsh-ms-pane-head' },
            h(
              'button',
              {
                type: 'button',
                className: 'dsh-ms-back',
                'aria-label': t('menu.back'),
                onClick: () => {
                  setPane('providers');
                  setQuery('');
                },
              },
              h(ChevronLeft),
            ),
            h(
              'span',
              { className: 'dsh-ms-pane-title' },
              selectedGroup?.name ?? t('menu.providers'),
            ),
          ),
        );
        if (selectedGroup !== null && selectedGroup.models.length > 6) {
          menuContent.push(
            h(
              'div',
              { key: 'search', className: 'dsh-ms-search' },
              h('input', {
                ref: searchRef,
                type: 'text',
                role: 'searchbox',
                'aria-label': t('search.placeholder'),
                placeholder: t('search.placeholder'),
                value: query,
                onChange: (event) => setQuery(event.target.value),
                onKeyDown: (event) => {
                  if (event.key === 'Enter' && filteredModels.length > 0) {
                    event.preventDefault();
                    chooseModel(selectedGroup, filteredModels[0], true);
                  }
                },
              }),
              query === ''
                ? null
                : h(
                    'button',
                    {
                      type: 'button',
                      className: 'dsh-ms-search-clear',
                      'aria-label': t('search.clear'),
                      onClick: () => {
                        setQuery('');
                        searchRef.current?.focus();
                      },
                    },
                    '×',
                  ),
            ),
          );
        }
        menuContent.push(
          h(
            'div',
            {
              key: 'models',
              className: 'dsh-ms-list',
              role: 'group',
              'aria-label': selectedGroup?.name ?? '',
            },
            selectedGroup === null || filteredModels.length === 0
              ? h(
                  'div',
                  { className: 'dsh-ms-status', role: 'status' },
                  selectedGroup === null
                    ? t('empty.models')
                    : t('empty.search'),
                )
              : filteredModels.map((model) =>
                  h(ModelRow, {
                    key: model.id,
                    group: selectedGroup,
                    model,
                    selected: isSameSelection(current, selectedGroup.id, model.id),
                    pending,
                    disabled: busy,
                    onChoose: () => chooseModel(selectedGroup, model, true),
                    renderSlot,
                    t,
                  }),
                ),
          ),
        );
      }

      const menu = h(
        'div',
        {
          ref: menuRef,
          className: 'dsh-ms-menu',
          role: 'menu',
          'aria-label': t('menu.aria'),
          'aria-busy': state.status === 'loading' || busy,
          'data-menu-material': '',
          'data-trigger-menu': '',
          'data-ms-seat': anchor?.seat == null ? undefined : 'true',
          style: {
            position: anchor?.seat == null ? 'fixed' : 'absolute',
            right: `${anchor?.right ?? 12}px`,
            bottom: `${anchor?.bottom ?? 12}px`,
            maxHeight: `${anchor?.maxHeight ?? 420}px`,
          },
          onMouseDown: (event) => {
            if (event.target instanceof Element && event.target.closest('button') !== null) {
              event.preventDefault();
            }
          },
        },
        menuContent,
      );

      return h(
        'div',
        {
          ref: rootRef,
          className: 'dsh-ms-root',
          onKeyDown,
          onBlur,
          onMouseDown: (event) => {
            if (event.target instanceof Element && event.target.closest('button') !== null) {
              event.preventDefault();
            }
          },
        },
        h(
          'button',
          {
            ref: triggerRef,
            type: 'button',
            className: 'dsh-ms-trigger',
            'aria-label': triggerAria,
            'aria-haspopup': 'menu',
            'aria-expanded': open,
            'aria-busy': busy,
            title: triggerTitle,
            disabled: locked,
            'data-selection-focus': selectionFocus ? '' : undefined,
            onBlur: () => setSelectionFocus(false),
            onClick: () => {
              if (open) closeMenu(true);
              else openMenu();
            },
          },
          h(DataIcon, { className: 'dsh-ms-trigger-icon' }),
          h('span', { className: 'dsh-ms-trigger-label' }, triggerText),
          effortLabel === undefined
            ? null
            : h('span', { className: 'dsh-ms-trigger-effort' }, effortLabel),
          busy
            ? h(Spinner)
            : h(ChevronDown, {
                className: cx('dsh-ms-trigger-chevron', open && 'dsh-ms-chevron-open'),
              }),
        ),
        open &&
          ReactDOM.createPortal(
            menu,
            anchor?.seat == null ? document.body : portalRef.current ?? document.body,
          ),
      );
    }
    //#endregion

    //#region plugin
    /** Required services: the seat registry, dictionaries, and the model directory service. */
    const inject = [
      'slots',
      'locale',
      'modelDirectories',
      'sessions',
      // Directory methods read the Host generation through `remote.session`;
      // tracing binds that access to this client's inject list.
      'remote',
      'remote.session',
    ];

    /**
     * Shadow the composer model seat with the provider-first selector.
     * @param ctx - Client plugin context.
     */
    function apply(ctx) {
      ctx.effect(
        () => ctx.locale.register(NS, { zh, en }),
        'dsh-model-selecter: dictionaries',
      );
      ctx.inject(['slots', 'modelDirectories', 'sessions', 'remote', 'remote.session'], (scope) => {
        const models = scope.modelDirectories;
        const sessions = scope.sessions;
        const options = {
          name: 'conversation.input.model',
          // The shipped seat registers at the default priority 0. Installed
          // Client bundles do not receive the dynamic runner's automatic
          // shadowing priority, so the overlay states its own: lower renders.
          priority: -1,
          locale: NS,
          inject: (sessionId) => {
            const directory = models.directoryFor(sessionId);
            const available = sessions.subagentAddress(sessionId) === undefined;
            return {
              available,
              directory: directory.store,
              load: () => {
                if (available) directory.load().catch(() => {});
              },
              select: (selection) =>
                available ? directory.select(selection) : Promise.resolve(undefined),
            };
          },
        };
        scope.slots.inject('conversation.input.model', () => {
          // Re-declare the inline label child only when the shipped seat is not
          // mounted: while it is, that seat already owns the declaration and
          // declaring it again is rejected. Without the declaration the menu
          // renders catalog names, which is exactly the slot's fallback.
          try {
            return scope.slots.register(
              {
                ...options,
                children: {
                  'conversation.input.model.label': {
                    kind: 'single',
                    scope: 'session',
                    inline: true,
                  },
                },
              },
              ModelSelecter,
            );
          } catch (error) {
            if (!/already declared/.test(String(error?.message))) throw error;
            return scope.slots.register(options, ModelSelecter);
          }
        });
      });
    }
    //#endregion

    exports.apply = apply;
    exports.inject = inject;
    return module.exports;
  },
});
