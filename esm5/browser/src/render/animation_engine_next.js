import * as tslib_1 from "tslib";
import { buildAnimationAst } from '../dsl/animation_ast_builder';
import { buildTrigger } from '../dsl/animation_trigger';
import { parseTimelineCommand } from './shared';
import { TimelineAnimationEngine } from './timeline_animation_engine';
import { TransitionAnimationEngine } from './transition_animation_engine';
var AnimationEngine = /** @class */ (function () {
    function AnimationEngine(_driver, normalizer) {
        var _this = this;
        this._driver = _driver;
        this._triggerCache = {};
        // this method is designed to be overridden by the code that uses this engine
        this.onRemovalComplete = function (element, context) { };
        this._transitionEngine = new TransitionAnimationEngine(_driver, normalizer);
        this._timelineEngine = new TimelineAnimationEngine(_driver, normalizer);
        this._transitionEngine.onRemovalComplete = function (element, context) {
            return _this.onRemovalComplete(element, context);
        };
    }
    AnimationEngine.prototype.registerTrigger = function (componentId, namespaceId, hostElement, name, metadata) {
        var cacheKey = componentId + '-' + name;
        var trigger = this._triggerCache[cacheKey];
        if (!trigger) {
            var errors = [];
            var ast = buildAnimationAst(this._driver, metadata, errors);
            if (errors.length) {
                throw new Error("The animation trigger \"" + name + "\" has failed to build due to the following errors:\n - " + errors.join("\n - "));
            }
            trigger = buildTrigger(name, ast);
            this._triggerCache[cacheKey] = trigger;
        }
        this._transitionEngine.registerTrigger(namespaceId, name, trigger);
    };
    AnimationEngine.prototype.register = function (namespaceId, hostElement) {
        this._transitionEngine.register(namespaceId, hostElement);
    };
    AnimationEngine.prototype.destroy = function (namespaceId, context) {
        this._transitionEngine.destroy(namespaceId, context);
    };
    AnimationEngine.prototype.onInsert = function (namespaceId, element, parent, insertBefore) {
        this._transitionEngine.insertNode(namespaceId, element, parent, insertBefore);
    };
    AnimationEngine.prototype.onRemove = function (namespaceId, element, context) {
        this._transitionEngine.removeNode(namespaceId, element, context);
    };
    AnimationEngine.prototype.disableAnimations = function (element, disable) {
        this._transitionEngine.markElementAsDisabled(element, disable);
    };
    AnimationEngine.prototype.process = function (namespaceId, element, property, value) {
        if (property.charAt(0) == '@') {
            var _a = tslib_1.__read(parseTimelineCommand(property), 2), id = _a[0], action = _a[1];
            var args = value;
            this._timelineEngine.command(id, element, action, args);
        }
        else {
            this._transitionEngine.trigger(namespaceId, element, property, value);
        }
    };
    AnimationEngine.prototype.listen = function (namespaceId, element, eventName, eventPhase, callback) {
        // @@listen
        if (eventName.charAt(0) == '@') {
            var _a = tslib_1.__read(parseTimelineCommand(eventName), 2), id = _a[0], action = _a[1];
            return this._timelineEngine.listen(id, element, action, callback);
        }
        return this._transitionEngine.listen(namespaceId, element, eventName, eventPhase, callback);
    };
    AnimationEngine.prototype.flush = function (microtaskId) {
        if (microtaskId === void 0) { microtaskId = -1; }
        this._transitionEngine.flush(microtaskId);
    };
    Object.defineProperty(AnimationEngine.prototype, "players", {
        get: function () {
            return this._transitionEngine.players
                .concat(this._timelineEngine.players);
        },
        enumerable: true,
        configurable: true
    });
    AnimationEngine.prototype.whenRenderingDone = function () { return this._transitionEngine.whenRenderingDone(); };
    return AnimationEngine;
}());
export { AnimationEngine };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX2VuZ2luZV9uZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYW5pbWF0aW9ucy9icm93c2VyL3NyYy9yZW5kZXIvYW5pbWF0aW9uX2VuZ2luZV9uZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFTQSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQW1CLFlBQVksRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBSXhFLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUM5QyxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUNwRSxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUV4RSxJQUFBO0lBU0UseUJBQW9CLE9BQXdCLEVBQUUsVUFBb0M7UUFBbEYsaUJBTUM7UUFObUIsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7NkJBTGUsRUFBRTs7aUNBR2xDLFVBQUMsT0FBWSxFQUFFLE9BQVksS0FBTztRQUczRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSx5QkFBeUIsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLHVCQUF1QixDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztRQUV4RSxJQUFJLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLEdBQUcsVUFBQyxPQUFZLEVBQUUsT0FBWTtZQUNsRSxPQUFBLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDO1FBQXhDLENBQXdDLENBQUM7S0FDOUM7SUFFRCx5Q0FBZSxHQUFmLFVBQ0ksV0FBbUIsRUFBRSxXQUFtQixFQUFFLFdBQWdCLEVBQUUsSUFBWSxFQUN4RSxRQUFrQztRQUNwQyxJQUFN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QyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNuRTtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztLQUM3RjtJQUVELCtCQUFLLEdBQUwsVUFBTSxXQUF3QjtRQUF4Qiw0QkFBQSxFQUFBLGVBQXVCLENBQUM7UUFBVSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQUU7SUFFcEYsc0JBQUksb0NBQU87YUFBWDtZQUNFLE1BQU0sQ0FBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBNkI7aUJBQ3ZELE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQTRCLENBQUMsQ0FBQztTQUNoRTs7O09BQUE7SUFFRCwyQ0FBaUIsR0FBakIsY0FBb0MsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLEVBQUU7MEJBdEcxRjtJQXVHQyxDQUFBO0FBckZELDJCQXFGQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7QW5pbWF0aW9uTWV0YWRhdGEsIEFuaW1hdGlvblBsYXllciwgQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7VHJpZ2dlckFzdH0gZnJvbSAnLi4vZHNsL2FuaW1hdGlvbl9hc3QnO1xuaW1wb3J0IHtidWlsZEFuaW1hdGlvbkFzdH0gZnJvbSAnLi4vZHNsL2FuaW1hdGlvbl9hc3RfYnVpbGRlcic7XG5pbXBvcnQge0FuaW1hdGlvblRyaWdnZXIsIGJ1aWxkVHJpZ2dlcn0gZnJvbSAnLi4vZHNsL2FuaW1hdGlvbl90cmlnZ2VyJztcbmltcG9ydCB7QW5pbWF0aW9uU3R5bGVOb3JtYWxpemVyfSBmcm9tICcuLi9kc2wvc3R5bGVfbm9ybWFsaXphdGlvbi9hbmltYXRpb25fc3R5bGVfbm9ybWFsaXplcic7XG5cbmltcG9ydCB7QW5pbWF0aW9uRHJpdmVyfSBmcm9tICcuL2FuaW1hdGlvbl9kcml2ZXInO1xuaW1wb3J0IHtwYXJzZVRpbWVsaW5lQ29tbWFuZH0gZnJvbSAnLi9zaGFyZWQnO1xuaW1wb3J0IHtUaW1lbGluZUFuaW1hdGlvbkVuZ2luZX0gZnJvbSAnLi90aW1lbGluZV9hbmltYXRpb25fZW5naW5lJztcbmltcG9ydCB7VHJhbnNpdGlvbkFuaW1hdGlvbkVuZ2luZX0gZnJvbSAnLi90cmFuc2l0aW9uX2FuaW1hdGlvbl9lbmdpbmUnO1xuXG5leHBvcnQgY2xhc3MgQW5pbWF0aW9uRW5naW5lIHtcbiAgcHJpdmF0ZSBfdHJhbnNpdGlvbkVuZ2luZTogVHJhbnNpdGlvbkFuaW1hdGlvbkVuZ2luZTtcbiAgcHJpdmF0ZSBfdGltZWxpbmVFbmdpbmU6IFRpbWVsaW5lQW5pbWF0aW9uRW5naW5lO1xuXG4gIHByaXZhdGUgX3RyaWdnZXJDYWNoZToge1trZXk6IHN0cmluZ106IEFuaW1hdGlvblRyaWdnZXJ9ID0ge307XG5cbiAgLy8gdGhpcyBtZXRob2QgaXMgZGVzaWduZWQgdG8gYmUgb3ZlcnJpZGRlbiBieSB0aGUgY29kZSB0aGF0IHVzZXMgdGhpcyBlbmdpbmVcbiAgcHVibGljIG9uUmVtb3ZhbENvbXBsZXRlID0gKGVsZW1lbnQ6IGFueSwgY29udGV4dDogYW55KSA9PiB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9kcml2ZXI6IEFuaW1hdGlvbkRyaXZlciwgbm9ybWFsaXplcjogQW5pbWF0aW9uU3R5bGVOb3JtYWxpemVyKSB7XG4gICAgdGhpcy5fdHJhbnNpdGlvbkVuZ2luZSA9IG5ldyBUcmFuc2l0aW9uQW5pbWF0aW9uRW5naW5lKF9kcml2ZXIsIG5vcm1hbGl6ZXIpO1xuICAgIHRoaXMuX3RpbWVsaW5lRW5naW5lID0gbmV3IFRpbWVsaW5lQW5pbWF0aW9uRW5naW5lKF9kcml2ZXIsIG5vcm1hbGl6ZXIpO1xuXG4gICAgdGhpcy5fdHJhbnNpdGlvbkVuZ2luZS5vblJlbW92YWxDb21wbGV0ZSA9IChlbGVtZW50OiBhbnksIGNvbnRleHQ6IGFueSkgPT5cbiAgICAgICAgdGhpcy5vblJlbW92YWxDb21wbGV0ZShlbGVtZW50LCBjb250ZXh0KTtcbiAgfVxuXG4gIHJlZ2lzdGVyVHJpZ2dlcihcbiAgICAgIGNvbXBvbmVudElkOiBzdHJpbmcsIG5hbWVzcGFjZUlkOiBzdHJpbmcsIGhvc3RFbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZyxcbiAgICAgIG1ldGFkYXRhOiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEpOiB2b2lkIHtcbiAgICBjb25zdCBjYWNoZUtleSA9IGNvbXBvbmVudElkICsgJy0nICsgbmFtZTtcbiAgICBsZXQgdHJpZ2dlciA9IHRoaXMuX3RyaWdnZXJDYWNoZVtjYWNoZUtleV07XG4gICAgaWYgKCF0cmlnZ2VyKSB7XG4gICAgICBjb25zdCBlcnJvcnM6IGFueVtdID0gW107XG4gICAgICBjb25zdCBhc3QgPVxuICAgICAgICAgIGJ1aWxkQW5pbWF0aW9uQXN0KHRoaXMuX2RyaXZlciwgbWV0YWRhdGEgYXMgQW5pbWF0aW9uTWV0YWRhdGEsIGVycm9ycykgYXMgVHJpZ2dlckFzdDtcbiAgICAgIGlmIChlcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIGBUaGUgYW5pbWF0aW9uIHRyaWdnZXIgXCIke25hbWV9XCIgaGFzIGZhaWxlZCB0byBidWlsZCBkdWUgdG8gdGhlIGZvbGxvd2luZyBlcnJvcnM6XFxuIC0gJHtlcnJvcnMuam9pbihcIlxcbiAtIFwiKX1gKTtcbiAgICAgIH1cbiAgICAgIHRyaWdnZXIgPSBidWlsZFRyaWdnZXIobmFtZSwgYXN0KTtcbiAgICAgIHRoaXMuX3RyaWdnZXJDYWNoZVtjYWNoZUtleV0gPSB0cmlnZ2VyO1xuICAgIH1cbiAgICB0aGlzLl90cmFuc2l0aW9uRW5naW5lLnJlZ2lzdGVyVHJpZ2dlcihuYW1lc3BhY2VJZCwgbmFtZSwgdHJpZ2dlcik7XG4gIH1cblxuICByZWdpc3RlcihuYW1lc3BhY2VJZDogc3RyaW5nLCBob3N0RWxlbWVudDogYW55KSB7XG4gICAgdGhpcy5fdHJhbnNpdGlvbkVuZ2luZS5yZWdpc3RlcihuYW1lc3BhY2VJZCwgaG9zdEVsZW1lbnQpO1xuICB9XG5cbiAgZGVzdHJveShuYW1lc3BhY2VJZDogc3RyaW5nLCBjb250ZXh0OiBhbnkpIHtcbiAgICB0aGlzLl90cmFuc2l0aW9uRW5naW5lLmRlc3Ryb3kobmFtZXNwYWNlSWQsIGNvbnRleHQpO1xuICB9XG5cbiAgb25JbnNlcnQobmFtZXNwYWNlSWQ6IHN0cmluZywgZWxlbWVudDogYW55LCBwYXJlbnQ6IGFueSwgaW5zZXJ0QmVmb3JlOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5fdHJhbnNpdGlvbkVuZ2luZS5pbnNlcnROb2RlKG5hbWVzcGFjZUlkLCBlbGVtZW50LCBwYXJlbnQsIGluc2VydEJlZm9yZSk7XG4gIH1cblxuICBvblJlbW92ZShuYW1lc3BhY2VJZDogc3RyaW5nLCBlbGVtZW50OiBhbnksIGNvbnRleHQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX3RyYW5zaXRpb25FbmdpbmUucmVtb3ZlTm9kZShuYW1lc3BhY2VJZCwgZWxlbWVudCwgY29udGV4dCk7XG4gIH1cblxuICBkaXNhYmxlQW5pbWF0aW9ucyhlbGVtZW50OiBhbnksIGRpc2FibGU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl90cmFuc2l0aW9uRW5naW5lLm1hcmtFbGVtZW50QXNEaXNhYmxlZChlbGVtZW50LCBkaXNhYmxlKTtcbiAgfVxuXG4gIHByb2Nlc3MobmFtZXNwYWNlSWQ6IHN0cmluZywgZWxlbWVudDogYW55LCBwcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgaWYgKHByb3BlcnR5LmNoYXJBdCgwKSA9PSAnQCcpIHtcbiAgICAgIGNvbnN0IFtpZCwgYWN0aW9uXSA9IHBhcnNlVGltZWxpbmVDb21tYW5kKHByb3BlcnR5KTtcbiAgICAgIGNvbnN0IGFyZ3MgPSB2YWx1ZSBhcyBhbnlbXTtcbiAgICAgIHRoaXMuX3RpbWVsaW5lRW5naW5lLmNvbW1hbmQoaWQsIGVsZW1lbnQsIGFjdGlvbiwgYXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3RyYW5zaXRpb25FbmdpbmUudHJpZ2dlcihuYW1lc3BhY2VJZCwgZWxlbWVudCwgcHJvcGVydHksIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBsaXN0ZW4oXG4gICAgICBuYW1lc3BhY2VJZDogc3RyaW5nLCBlbGVtZW50OiBhbnksIGV2ZW50TmFtZTogc3RyaW5nLCBldmVudFBoYXNlOiBzdHJpbmcsXG4gICAgICBjYWxsYmFjazogKGV2ZW50OiBhbnkpID0+IGFueSk6ICgpID0+IGFueSB7XG4gICAgLy8gQEBsaXN0ZW5cbiAgICBpZiAoZXZlbnROYW1lLmNoYXJBdCgwKSA9PSAnQCcpIHtcbiAgICAgIGNvbnN0IFtpZCwgYWN0aW9uXSA9IHBhcnNlVGltZWxpbmVDb21tYW5kKGV2ZW50TmFtZSk7XG4gICAgICByZXR1cm4gdGhpcy5fdGltZWxpbmVFbmdpbmUubGlzdGVuKGlkLCBlbGVtZW50LCBhY3Rpb24sIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3RyYW5zaXRpb25FbmdpbmUubGlzdGVuKG5hbWVzcGFjZUlkLCBlbGVtZW50LCBldmVudE5hbWUsIGV2ZW50UGhhc2UsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGZsdXNoKG1pY3JvdGFza0lkOiBudW1iZXIgPSAtMSk6IHZvaWQgeyB0aGlzLl90cmFuc2l0aW9uRW5naW5lLmZsdXNoKG1pY3JvdGFza0lkKTsgfVxuXG4gIGdldCBwbGF5ZXJzKCk6IEFuaW1hdGlvblBsYXllcltdIHtcbiAgICByZXR1cm4gKHRoaXMuX3RyYW5zaXRpb25FbmdpbmUucGxheWVycyBhcyBBbmltYXRpb25QbGF5ZXJbXSlcbiAgICAgICAgLmNvbmNhdCh0aGlzLl90aW1lbGluZUVuZ2luZS5wbGF5ZXJzIGFzIEFuaW1hdGlvblBsYXllcltdKTtcbiAgfVxuXG4gIHdoZW5SZW5kZXJpbmdEb25lKCk6IFByb21pc2U8YW55PiB7IHJldHVybiB0aGlzLl90cmFuc2l0aW9uRW5naW5lLndoZW5SZW5kZXJpbmdEb25lKCk7IH1cbn1cbiJdfQ==